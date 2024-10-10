import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CustomLogger } from './logging/custom-logger.service';
import { RedisClientType } from 'redis';
import { Pool } from 'pg';
import { PurchaseDocument } from './entity/PurchaseDocument.entity';
import { PurchaseCommitment } from './entity/PurchaseCommitment.entity';
import { PurchaseDocumentAssociatedFiles } from './entity/PurchaseDocumentAssociatedFiles.entity';
import { PurchaseDocumentLine } from './entity/PurchaseDocumentLine.entity';

@Injectable()
export class PurchaseService {
  private readonly logger = new CustomLogger('PurchaseService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async paginate(
    email: string,
    limit: number,
    offset: number,
    searchQuery?: string,
  ) {
    const cacheKey = `purchase_paginated_${limit}_${offset}_${searchQuery}`;

    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      try {
        let query = `SELECT * FROM "PurchaseDocument"`;
        const queryParams: (string | number)[] = [];

        // Gestion du searchQuery
        if (searchQuery) {
          query += ` WHERE ("SupplierId" ILIKE $1 OR "DocumentNumber" ILIKE $1)`;
          queryParams.push(`%${searchQuery}%`);
        }

        // Indices pour limit et offset
        const limitIndex = queryParams.length + 1;
        const offsetIndex = queryParams.length + 2;

        query += ` ORDER BY "DocumentDate" DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;
        queryParams.push(limit, offset);

        const result = await this.pool.query(query, queryParams);

        // Calcul du total de documents
        let totalQuery = `SELECT COUNT(*) FROM "PurchaseDocument"`;
        const totalQueryParams: (string | number)[] = [];

        if (searchQuery) {
          totalQuery += ` WHERE ("SupplierId" ILIKE $1 OR "DocumentNumber" ILIKE $1)`;
          totalQueryParams.push(`%${searchQuery}%`);
        }

        const totalResult = await this.pool.query(totalQuery, totalQueryParams);
        const totalRecords = parseInt(totalResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalRecords / limit);

        const data = {
          purchaseDocuments: result.rows,
          totalPages,
          currentPage: Math.floor(offset / limit) + 1,
        };

        this.logger.log(
          `Fetched ${result.rows.length} purchase records for user: ${email}`,
        );

        // Mise en cache des données
        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(data));

        return data;
      } catch (error) {
        this.logger.error('Error during fetching purchase records', error);
        throw new BadRequestException('Failed to fetch purchase records');
      }
    }
  }

  async findOneById(Id: string, email: string): Promise<PurchaseDocument> {
    try {
      const query = `SELECT * FROM "PurchaseDocument" WHERE "Id" = $1`;
      const queryParams = [Id];

      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new NotFoundException('No purchase document found');
      }

      this.logger.log(`User: ${email} Fetched purchase document ${Id}`);

      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching purchase document`,
        error,
      );
      throw new BadRequestException('Failed to fetch purchase document');
    }
  }

  async findPurchaseCommitmentById(
    Id: string,
    email: string,
  ): Promise<PurchaseCommitment> {
    try {
      const query = `SELECT * FROM "PurchaseCommitment" WHERE "DocumentId" = $1`;
      const queryParams = [Id];

      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new NotFoundException('No purchase commitment found');
      }

      this.logger.log(
        `User: ${email} Fetched purchase commitment document ${Id}`,
      );

      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching purchase commitment`,
        error,
      );
      throw new BadRequestException(
        'Failed to fetch purchase commitment document',
      );
    }
  }

  async findPurchaseDocumentAssociatedFiles(
    Id: string,
    email: string,
  ): Promise<PurchaseDocumentAssociatedFiles[]> {
    try {
      const query = `SELECT * FROM "PurchaseDocumentAssociatedFiles" WHERE "ParentId" = $1`;
      const queryParams = [Id];

      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new NotFoundException('No associated files found');
      }

      this.logger.log(
        `User: ${email} Fetched associated files for document ${Id}`,
      );

      return result.rows; // Return all associated files
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching associated files`,
        error,
      );
      throw new BadRequestException('Failed to fetch associated files');
    }
  }

  async findPurchaseDocumentLine(
    Id: string,
    email: string,
  ): Promise<PurchaseDocumentLine[]> {
    try {
      const query = `SELECT * FROM "PurchaseDocumentLine" WHERE "DocumentId" = $1`;
      const queryParams = [Id];

      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new NotFoundException('No purchase document lines found');
      }

      this.logger.log(`User: ${email} Fetched lines for document ${Id}`);

      return result.rows; // Return all document lines
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching document lines`,
        error,
      );
      throw new BadRequestException('Failed to fetch document lines');
    }
  }

  async findOne(Id: string, email: string) {
    try {
      const [
        purchaseDocument,
        purchaseCommitment,
        purchaseDocumentAssociatedFiles,
        purchaseDocumentLine,
      ] = await Promise.all([
        this.findOneById(Id, email),
        this.findPurchaseCommitmentById(Id, email).catch(() => null),
        this.findPurchaseDocumentAssociatedFiles(Id, email).catch(() => []),
        this.findPurchaseDocumentLine(Id, email).catch(() => []),
      ]);

      this.logger.log(
        `User: ${email} Fetched complete purchase document data for ${Id}`,
      );

      return {
        purchaseDocument,
        purchaseCommitment,
        purchaseDocumentAssociatedFiles,
        purchaseDocumentLine,
      };
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching complete purchase document data`,
        error,
      );
      throw new BadRequestException(
        'Failed to fetch complete purchase document data',
      );
    }
  }

  async paginateByCategory(
    category: string,
    limit: number,
    offset: number,
    searchQuery?: string,
  ) {
    try {
      // Validation des paramètres limit et offset
      if (limit <= 0 || offset < 0) {
        throw new BadRequestException(
          'Limit and offset must be positive numbers.',
        );
      }

      let query = `SELECT * FROM "PurchaseDocument" WHERE "NumberPrefix" = $1`;
      const queryParams: (string | number)[] = [category];

      if (searchQuery) {
        query += ` AND ("DocumentNumber" ILIKE $2 OR "SupplierName" ILIKE $2)`;
        queryParams.push(`%${searchQuery}%`);
      }

      // Indices pour limit et offset
      const limitIndex = queryParams.length + 1;
      const offsetIndex = queryParams.length + 2;

      query += ` ORDER BY "DocumentDate" DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;
      queryParams.push(limit, offset);

      const result = await this.pool.query(query, queryParams);

      // Calcul du total de documents
      let totalQuery = `SELECT COUNT(*) FROM "PurchaseDocument" WHERE "NumberPrefix" = $1`;
      const totalQueryParams: (string | number)[] = [category];

      if (searchQuery) {
        totalQuery += ` AND ("DocumentNumber" ILIKE $2 OR "SupplierName" ILIKE $2)`;
        totalQueryParams.push(`%${searchQuery}%`);
      }

      const totalResult = await this.pool.query(totalQuery, totalQueryParams);
      const totalRecords = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalRecords / limit);

      return {
        purchaseDocuments: result.rows,
        totalPages,
        currentPage: Math.floor(offset / limit) + 1,
      };
    } catch (error) {
      this.logger.error('Error during fetching purchase records', error);
      throw new BadRequestException('Failed to fetch purchase records');
    }
  }
}

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
        let query = `SELECT * FROM "PurchaseDocument" `;
        const queryParams: (number | string)[] = [limit, offset];

        if (searchQuery) {
          query += `WHERE ("description" ILIKE $3 OR "title" ILIKE $3) `;
          queryParams.push(`%${searchQuery}%`); // searchQuery becomes $3
        }

        query += `ORDER BY "DocumentDate" DESC LIMIT $1 OFFSET $2`;

        const result = await this.pool.query(query, queryParams);

        if (result.rows.length === 0) {
          throw new NotFoundException('No purchase documents found');
        }

        this.logger.log(
          `Fetched ${result.rows.length} purchase records for user: ${email}`,
        );

        await this.redisClient.setEx(
          cacheKey,
          3600,
          JSON.stringify(result.rows),
        );

        return result.rows;
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

      this.logger.log(`User: ${email}Fetched purchase document ${Id}`);

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
        throw new NotFoundException('No purchase document found');
      }

      this.logger.log(
        `User: ${email}Fetched PurchaseCommitment document ${Id}`,
      );

      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching PurchaseCommitment document`,
        error,
      );
      throw new BadRequestException(
        'Failed to fetch PurchaseCommitment document',
      );
    }
  }

  async findPurchaseDocumentAssociatedFiles(
    Id: string,
    email: string,
  ): Promise<PurchaseDocumentAssociatedFiles> {
    try {
      const query = `SELECT * FROM "PurchaseDocumentAssociatedFiles" WHERE "ParentId" = $1`;
      const queryParams = [Id];

      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new NotFoundException('No purchase document found');
      }

      this.logger.log(`User: ${email}Fetched purchase document ${Id}`);

      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching purchase document`,
        error,
      );
      throw new BadRequestException('Failed to fetch purchase document');
    }
  }

  async findPurchaseDocumentLine(
    Id: string,
    email: string,
  ): Promise<PurchaseDocumentLine> {
    try {
      const query = `SELECT * FROM "PurchaseDocumentLine" WHERE "DocumentId" = $1`;
      const queryParams = [Id];

      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new NotFoundException('No PurchaseDocumentLin found');
      }

      this.logger.log(`User: ${email}Fetched PurchaseDocumentLin ${Id}`);

      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching PurchaseDocumentLin`,
        error,
      );
      throw new BadRequestException('Failed to fetch PurchaseDocumentLin');
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
        this.findPurchaseCommitmentById(Id, email),
        this.findPurchaseDocumentAssociatedFiles(Id, email),
        this.findPurchaseDocumentLine(Id, email),
      ]);
      this.logger.log(`User: ${email}Fetched purchase document ${Id}`);

      return {
        purchaseDocument,
        purchaseCommitment,
        purchaseDocumentAssociatedFiles,
        purchaseDocumentLine,
      };
    } catch (error) {
      this.logger.error(
        `User: ${email} Error during fetching purchase document`,
        error,
      );
      throw new BadRequestException('Failed to fetch purchase document');
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from './logging/custom-logger.service';
import { RedisClientType } from 'redis';
import { Pool } from 'pg';
import { MaintenanceContract } from './entity/MaintenanceContract.entity';
import { MaintenanceContractAssociatedFiles } from './entity/MaintenanceContractAssociatedFiles.entity';
import { MaintenanceContractCommitment } from './entity/MaintenanceContractCommitment.entity';
import { MaintenanceContractCost } from './entity/MaintenanceContractCost.entity';
// import { MaintenanceContractCustomerProduct } from './entity/MaintenanceContractCustomerProduct.entity';
import { MaintenanceContractInvoiceContentLine } from './entity/MaintenanceContractInvoiceContentLine.entity';
import { MaintenanceContractPurchaseDocument } from './entity/MaintenanceContractPurchaseDocument.entity';
import { MaintenanceContractStockDocument } from './entity/MaintenanceContractStockDocument.entity';

@Injectable()
export class MaintenanceService {
  private readonly logger = new CustomLogger('MaintenanceService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async paginate(
    email: string,
    searchQuery: string,
    limit: number,
    offset: number,
  ) {
    if (!limit || limit < 1) {
      limit = 25;
    }
    if (!offset || offset < 0) {
      offset = 0;
    }
    if (!searchQuery) {
      searchQuery = '';
    }

    const query = `
      SELECT * FROM maintenance
      WHERE email ILIKE $1
      AND (description ILIKE $2 OR title ILIKE $2)
      ORDER BY created_at DESC
      LIMIT $3
      OFFSET $4
    `;

    const queryParams = [`%${searchQuery}%`, limit, offset];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(
        `Fetched ${result.rows.length} maintenance records, for user: ${email}`,
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error during pagination', error);
      throw new Error('Failed to paginate maintenance');
    }
  }

  async findOne(Id: string, email: string) {
    const query = `
    SELECT 
        mc.*, 
        maf.*, 
        mcc.*, 
        mco.*, 
        mic.*, 
        mpd.*, 
        msd.*
    FROM "MaintenanceContract" mc
    LEFT JOIN "MaintenanceContractAssociatedFiles" maf ON mc."Id" = maf."ParentId"
    LEFT JOIN "MaintenanceContractCommitment" mcc ON mc."Id" = mcc."MaintenanceContractId"
    LEFT JOIN "MaintenanceContractCost" mco ON mc."Id" = mco."MaintenanceContractId"
    LEFT JOIN "MaintenanceContractInvoiceContentLine" mic ON mc."Id" = mic."ContractId"
    LEFT JOIN "MaintenanceContractPurchaseDocument" mpd ON mc."Id" = mpd."MaintenanceContractId"
    LEFT JOIN "MaintenanceContractStockDocument" msd ON mc."Id" = msd."MaintenanceContractId"
    WHERE mc."Id" = $1;
  `;

    const queryParams = [Id];

    try {
      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        this.logger.warn(`No maintenance contract found for Id: ${Id}`);
        return null;
      }

      // Fonction utilitaire pour organiser les données par préfixe
      const organizeDataByPrefix = (row, prefix) => {
        const result = {};
        Object.keys(row).forEach((key) => {
          if (key.startsWith(prefix)) {
            const cleanKey = key.replace(`${prefix}_`, '');
            result[cleanKey] = row[key];
          }
        });
        return result;
      };

      // Récupérer les données des différentes tables
      const maintenanceContract = organizeDataByPrefix(result.rows[0], 'mc');
      const associatedFiles = result.rows
        .filter((row) => row['maf_ParentId'] !== null)
        .map((row) => organizeDataByPrefix(row, 'maf'));
      const commitment = organizeDataByPrefix(result.rows[0], 'mcc');
      const cost = organizeDataByPrefix(result.rows[0], 'mco');
      const invoiceContentLine = result.rows
        .filter((row) => row['mic_ContractId'] !== null)
        .map((row) => organizeDataByPrefix(row, 'mic'));
      const purchaseDocument = organizeDataByPrefix(result.rows[0], 'mpd');
      const stockDocument = result.rows
        .filter((row) => row['msd_ContractId'] !== null)
        .map((row) => organizeDataByPrefix(row, 'msd'));

      // Retourner un objet structuré sans écrire chaque colonne explicitement
      const formattedResult = {
        maintenanceContract,
        associatedFiles,
        commitment,
        cost,
        invoiceContentLine,
        purchaseDocument,
        stockDocument,
      };

      this.logger.log(
        `Fetched maintenance contract with Id: ${Id}, for user: ${email}`,
      );
      return formattedResult;
    } catch (error) {
      this.logger.error(
        `Error fetching maintenance contract for Id: ${Id}`,
        error,
      );
      throw new Error(`Failed to fetch maintenance contract for Id: ${Id}`);
    }
  }

  async findMaintenanceContractById(Id: string): Promise<MaintenanceContract> {
    const query = `
      SELECT * FROM "MaintenanceContract"
      WHERE "Id" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);

      if (result.rows.length === 0) {
        this.logger.warn(`No maintenance contract found for Id: ${Id}`);
        return null;
      }

      this.logger.log(
        `Fetched findMaintenanceContractById record with Id: ${Id}`,
      );
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  async findMaintenanceContractAssociatedFiles(
    Id: string,
  ): Promise<MaintenanceContractAssociatedFiles> {
    const query = `
      SELECT * FROM "MaintenanceContractAssociatedFiles"
      WHERE "ParentId" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(
        `Fetched findMaintenanceContractAssociatedFiles record with Id: ${Id}`,
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  async findMaintenanceContractCommitment(
    Id: string,
  ): Promise<MaintenanceContractCommitment> {
    const query = `
      SELECT * FROM "MaintenanceContractCommitment"
      WHERE "MaintenanceContractId" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(`Fetched   async findMaintenanceContractCommitment(
 record with Id: ${Id}`);
      return result.rows;
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  async findMaintenanceContractCost(
    Id: string,
  ): Promise<MaintenanceContractCost> {
    const query = `
      SELECT * FROM "MaintenanceContractCost"
      WHERE "MaintenanceContractId" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(
        `Fetched findMaintenanceContractCost record with Id: ${Id}`,
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  // async findMaintenanceContractCustomerProduct(
  //   Id: string,
  // ): Promise<MaintenanceContractCustomerProduct> {
  //   const query = `
  //     SELECT * FROM "MaintenanceCustomerProduct"
  //     WHERE "ContractId" ILIKE $1
  //   `;

  //   const queryParams = [Id];
  //   try {
  //     const result = await this.pool.query(query, queryParams);
  //     this.logger.log(`Fetched maintenance record with Id: ${Id}`);
  //     return result.rows;
  //   } catch (error) {
  //     this.logger.error('Error during fetching maintenance by Id', error);
  //     throw new Error('Failed to fetch maintenance record');
  //   }
  // }

  async findMaintenanceContractInvoiceContentLine(
    Id: string,
  ): Promise<MaintenanceContractInvoiceContentLine> {
    const query = `
      SELECT * FROM "MaintenanceContractInvoiceContentLine"
      WHERE "ContractId" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(
        `Fetched findMaintenanceContractInvoiceContentLine record with Id: ${Id}`,
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  async findMaintenanceContractPurchaseDocument(
    Id: string,
  ): Promise<MaintenanceContractPurchaseDocument> {
    const query = `
      SELECT * FROM "MaintenanceContractPurchaseDocument"
      WHERE "MaintenanceContractId" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(
        `Fetched findMaintenanceContractPurchaseDocument record with Id: ${Id}`,
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  async findMaintenanceContractStockDocument(
    Id: string,
  ): Promise<MaintenanceContractStockDocument> {
    const query = `
      SELECT * FROM "MaintenanceContractStockDocument"
      WHERE "MaintenanceContractId" ILIKE $1
    `;

    const queryParams = [Id];
    try {
      const result = await this.pool.query(query, queryParams);
      this.logger.log(
        `Fetched findMaintenanceContractStockDocument record with Id: ${Id}`,
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error during fetching maintenance by Id', error);
      throw new Error('Failed to fetch maintenance record');
    }
  }

  async findOneFull(Id: string, email: string) {
    try {
      const [
        maintenanceContract,
        associatedFiles,
        commitment,
        cost,
        // customerProduct,
        invoiceContentLine,
        purchaseDocument,
        stockDocument,
      ] = await Promise.all([
        this.findMaintenanceContractById(Id),
        this.findMaintenanceContractAssociatedFiles(Id),
        this.findMaintenanceContractCommitment(Id),
        this.findMaintenanceContractCost(Id),
        // this.findMaintenanceContractCustomerProduct(Id),
        this.findMaintenanceContractInvoiceContentLine(Id),
        this.findMaintenanceContractPurchaseDocument(Id),
        this.findMaintenanceContractStockDocument(Id),
      ]);
      this.logger.log(
        `Fetched maintenance record with Id: ${Id}, for user: ${email}`,
      );
      return {
        maintenanceContract,
        associatedFiles,
        commitment,
        cost,
        // customerProduct,
        invoiceContentLine,
        purchaseDocument,
        stockDocument,
      };
    } catch (error) {
      this.logger.error(
        `user ${email}: Error during fetching maintenance by Id ${Id}:`,
        error,
      );
      throw new Error(`Failed to fetch maintenance record for Id: ${Id}`);
    }
  }
}

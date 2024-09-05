import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDocumentDto } from './dto/create-stock.dto';
//import { UpdateStockDocumentDto } from './dto/create-stock.dto';
import { Pool } from 'pg';
import { StockDocument } from './entities/stock.entity';
import { CustomLogger } from './logging/custom-logger.service';
import { RedisClientType } from 'redis';

@Injectable()
export class StockService {
  private readonly logger = new CustomLogger('StockService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async create(
    createStockDto: CreateStockDocumentDto,
    email: string,
  ): Promise<StockDocument> {
    this.logger.log(
      `Creating new stock with data: ${JSON.stringify(createStockDto)}, User: ${email}`,
    );

    const fields: string[] = [];
    const placeholders: string[] = [];
    const values: any[] = [];

    Object.entries(createStockDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(this.toSnakeCase(key));
        placeholders.push(`$${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      this.logger.log(`No data provided to create stock, '', ${email}`);
      throw new Error('No data provided to create stock.');
    }

    try {
      const query = `
        INSERT INTO "Stock" (${fields.join(', ')})
        VALUES (${placeholders.join(', ')})
        RETURNING *;
      `;

      const result = await this.pool.query(query, values);
      this.logger.log(
        `Stock created with ID: ${result.rows[0].id}, User: ${email}`,
      );
      return result.rows[0] as StockDocument;
    } catch (error) {
      this.logger.error(
        `Failed to create stock, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(email: string): Promise<StockDocument[]> {
    try {
      const result = await this.pool.query('SELECT * FROM "Stock"');
      this.logger.log(`Fetched all stocks for user: ${email}`);
      return result.rows as StockDocument[];
    } catch (error) {
      this.logger.error(
        `Failed to fetch stocks, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async paginate(data: {
    paginationParams: { limit: number; offset: number; searchQuery?: string };
    email: string;
  }): Promise<{
    totalStocks: number;
    totalPages: number;
    stocks: StockDocument[];
  }> {
    const { paginationParams, email } = data;

    if (!paginationParams) {
      throw new BadRequestException('Missing pagination parameters');
    }

    const { limit, offset, searchQuery } = paginationParams;

    this.logger.log(
      `Fetching paginated stocks with limit: ${limit}, offset: ${offset}, searchQuery: ${searchQuery}, User: ${email}`,
    );

    // Construction de la clé du cache
    const cacheKey = `stocks_paginated_${limit}_${offset}_${searchQuery || ''}`;

    // Tentative de récupération depuis le cache Redis
    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      this.logger.log('Cache hit for key: ' + cacheKey);
      return JSON.parse(cachedData);
    }

    this.logger.log('Cache miss for key: ' + cacheKey);

    try {
      let query = `SELECT * FROM "StockDocument"`;
      let countQuery = `SELECT COUNT(*) FROM "StockDocument"`;
      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      if (searchQuery) {
        query += ` WHERE "DocumentNumber" ILIKE $1 OR "Reference" ILIKE $1 OR "NotesClear" ILIKE $1`;
        countQuery += ` WHERE "DocumentNumber" ILIKE $1 OR "Reference" ILIKE $1 OR "NotesClear" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      // Ajout des paramètres pour la limite et le décalage
      queryParams.push(limit);
      queryParams.push(offset);

      query += ` ORDER BY "DocumentDate" ASC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
      countQuery += `;`;

      // Exécution des requêtes en parallèle pour plus d'efficacité
      const [stockResult, totalResult] = await Promise.all([
        this.pool.query(query, queryParams),
        this.pool.query(countQuery, countParams),
      ]);

      const totalStocks = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalStocks / limit);

      const response = {
        totalStocks,
        totalPages,
        stocks: stockResult.rows as StockDocument[],
      };

      // Mise en cache des résultats
      await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

      return response;
    } catch (error) {
      this.logger.error(
        `Failed to fetch paginated stocks for user: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(
    id: string | number,
    email: string,
  ): Promise<StockDocument | null> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.log(`Invalid ID received: ${id}, ${email}`);
      throw new BadRequestException('Invalid ID');
    }

    const query = `SELECT * FROM "StockDocument" WHERE id = $1`;
    const values = [parsedId];

    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length > 0) {
        this.logger.log(`Stock with ID: ${parsedId} found, User: ${email}`);
        return result.rows[0] as StockDocument;
      } else {
        this.logger.warn(
          `Stock with ID: ${parsedId} not found, User: ${email}`,
        );
        throw new NotFoundException(`Stock with id ${parsedId} not found`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to fetch stock with ID: ${parsedId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getAllStockDocLines(): Promise<any[]> {
    try {
      const query = `SELECT * FROM "StockDocumentLine"`;
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des lignes de document de stock',
        error.stack,
      );
      throw error;
    }
  }

  async getAllStoreHouse(): Promise<any[]> {
    try {
      const query = `SELECT * FROM "Storehouse"`;
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des entrepôts',
        error.stack,
      );
      throw error;
    }
  }

  async getStorehouseNameById(id: string): Promise<string> {
    try {
      const query = `SELECT "Caption" FROM "Storehouse" WHERE "Id" = $1`;
      const result = await this.pool.query(query, [id]);
      return result.rows[0].Caption;
    } catch (error) {
      this.logger.error(
        "Erreur lors de la récupération du nom de l'entrepôt",
        error.stack,
      );
      throw error;
    }
  }

  async getAllStockWithDetails(): Promise<any[]> {
    try {
      const query = `
        SELECT 
          sd.*,
          sdl.*,
          sh.*
        FROM 
          "StockDocument" sd
        LEFT JOIN 
          "StockDocumentLine" sdl ON sd."Id" = sdl."DocumentId"
        LEFT JOIN 
          "Storehouse" sh ON sd."StorehouseId" = sh."Id"
      `;
      const result = await this.pool.query(query);

      const stockDocuments = result.rows.reduce((acc: any[], row: any) => {
        let stockDocument = acc.find((doc: any) => doc.Id === row.Id);

        if (!stockDocument) {
          stockDocument = {
            ...row,
            StockDocumentLines: [],
            Storehouse: {
              Id: row.StorehouseId,
              Name: row.StorehouseCaption,
            },
          };
          acc.push(stockDocument);
        }

        if (row.StockMovementId) {
          stockDocument.StockDocumentLines.push({
            Id: row.StockMovementId,
          });
        }

        return acc;
      }, []);

      return stockDocuments;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des stocks avec détails',
        error.stack,
      );
      throw error;
    }
  }

  async getStockWithDetailsByDocumentId(DocumentId: string): Promise<any> {
    try {
      const query = `
        SELECT 
          sd.*,
          sdl.*,
          i.*,
          sh."Id" AS "StorehouseId",
          sh."Caption" AS "StorehouseCaption"
        FROM 
          "StockDocument" sd
        LEFT JOIN 
          "StockDocumentLine" sdl ON sd."Id" = sdl."DocumentId"
        LEFT JOIN 
          "Storehouse" sh ON sd."StorehouseId" = sh."Id"
        LEFT JOIN 
          "Item" i ON sdl."ItemId" = i."Id"
        WHERE 
          sd."Id" = $1
      `;

      const result = await this.pool.query(query, [DocumentId]);

      const stockDocuments = result.rows.reduce((acc: any[], row: any) => {
        let stockDocument = acc.find((doc: any) => doc.Id === row.Id);

        if (!stockDocument) {
          stockDocument = {
            ...row,
            StockDocumentLines: [],
            Storehouse: {
              Id: row.StorehouseId,
              Name: row.StorehouseCaption,
            },
          };
          acc.push(stockDocument);
        }

        if (row.StockMovementId) {
          stockDocument.StockDocumentLines.push({
            Id: row.StockMovementId,
            ItemId: row.ItemId,
            Description: row.DescriptionClear,
            Item: {
              Id: row.ItemId,
              Name: row.Caption,
              Prix_HT: row.SalePriceVatExcluded,
              Prix_TTC: row.SalePriceVatIncluded,
              prix_achat: row.PurchasePrice,
            },
          });
        }

        return acc;
      }, []);

      return stockDocuments;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des détails du stock par ID',
        error.stack,
      );
      throw error;
    }
  }

  async getStockWithinDateRange(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    try {
      const query = `
        SELECT *
        FROM "StockDocument"
        WHERE "DocumentDate" BETWEEN $1 AND $2;
      `;
      const result = await this.pool.query(query, [startDate, endDate]);
      return result.rows;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des stocks dans une plage de dates',
        error.stack,
      );
      throw error;
    }
  }

  async getStockDocumentLineByDocId(DocumentId: string): Promise<any[]> {
    try {
      const query = `
        SELECT sdl.*, i.*
        FROM "StockDocumentLine" sdl
        LEFT JOIN "Item" i ON sdl."ItemId" = i."Id"
        WHERE sdl."DocumentId" = $1;
      `;
      const result = await this.pool.query(query, [DocumentId]);
      return result.rows;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération des lignes de document de stock par DocumentId',
        error.stack,
      );
      throw error;
    }
  }

  async getStockByDocId(DocumentId: string): Promise<any> {
    try {
      const query = `
        SELECT *
        FROM "StockDocument"
        WHERE "Id" = $1;
      `;
      const result = await this.pool.query(query, [DocumentId]);
      return result.rows;
    } catch (error) {
      this.logger.error(
        'Erreur lors de la récupération du stock par DocumentId',
        error.stack,
      );
      throw error;
    }
  }
}

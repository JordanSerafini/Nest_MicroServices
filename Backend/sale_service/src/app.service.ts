import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CustomLogger } from './logging/custom-logger.service';
import { Pool } from 'pg';
import { RedisClientType } from 'redis';

@Injectable()
export class SaleService {
  private readonly logger = new CustomLogger('SaleService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async findOne(Id: string, email: string) {
    this.logger.log(`Finding sale with ID: ${Id}, User: ${email}`);

    const query = `
      SELECT 
        sd.*,
        sdl.*
      FROM "SaleDocument" sd
      LEFT JOIN "SaleDocumentLine" sdl
      ON sd."Id" = sdl."DocumentId"
      WHERE sd."Id" = $1;
    `;

    try {
      const result = await this.pool.query(query, [Id]);
      if (result.rows.length === 0) {
        this.logger.error(`No sale found with ID: ${Id}`, `User: ${email}`);
        return null;
      }

      const saleDocument = {
        ...result.rows[0],
        SaleDocumentLine: result.rows
          .filter((row) => row.DocumentId === Id)
          .map((row) => ({
            LineOrder: row.LineOrder,
            ItemId: row.ItemId,
            Description: row.Description,
            Quantity: row.Quantity,
            RealQuantity: row.RealQuantity,
            NetAmountVatExcluded: row.NetAmountVatExcluded,
            NetAmountVatIncluded: row.NetAmountVatIncluded,
            NetAmountVatExcludedWithDiscount:
              row.NetAmountVatExcludedWithDiscount,
            NetAmountVatIncludedWithDiscount:
              row.NetAmountVatIncludedWithDiscount,
            DiscountRate: row.TotalDiscountRate,
            VatAmount: row.VatAmount,
            VatId: row.VatId,
            DeliveryDate: row.DeliveryDate,
            TotalWeight: row.TotalWeight,
            TotalVolume: row.TotalVolume,
          })),
      };

      return {
        saleDocument,
      };
    } catch (error) {
      console.log(error);
      this.logger.error(
        `Error while finding sale with ID: ${Id}`,
        `User: ${email}`,
      );
      return null;
    }
  }

  async paginate(searchQuery: string, limit: number, page: number) {
    this.logger.log(`Paginating SaleDocuments with query: ${searchQuery}`);

    const limitValue = limit > 0 ? limit : 10;
    const offset = page * limitValue;

    const cacheKey = `saleDocuments_paginated_${limitValue}_${offset}_${searchQuery}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      let query = `SELECT * FROM "SaleDocument"`;
      let countQuery = `SELECT COUNT(*) FROM "SaleDocument"`;
      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      if (searchQuery) {
        query += ` WHERE "CustomerName" ILIKE $1 OR "DocumentNumber" ILIKE $1 OR "NumberPrefix" ILIKE $1`;
        countQuery += ` WHERE "CustomerName" ILIKE $1 OR "DocumentNumber" ILIKE $1 OR "NumberPrefix" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      query += ` ORDER BY "NumberPrefix" ASC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;

      queryParams.push(limitValue);
      queryParams.push(offset);

      try {
        const [saleResult, totalResult] = await Promise.all([
          this.pool.query(query, queryParams),
          this.pool.query(countQuery, countParams),
        ]);

        const totalSaleDocuments = parseInt(totalResult.rows[0].count, 10);
        const totalPages =
          totalSaleDocuments > 0
            ? Math.ceil(totalSaleDocuments / limitValue)
            : 0;

        const response = {
          totalSaleDocuments,
          totalPages,
          saleDocuments: saleResult.rows,
        };

        // Cacher le résultat pour 1 heure
        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return response;
      } catch (error) {
        this.logger.error(
          `Error while paginating SaleDocuments with query: ${searchQuery}`,
          error.message,
        );
        return [];
      }
    }
  }

  async paginateByDate(searchQuery: string, limit: number, page: number) {
    this.logger.log(`Paginating SaleDocuments with query: ${searchQuery}`);

    const limitValue = limit > 0 ? limit : 10;
    const offset = page * limitValue;

    const cacheKey = `saleDocuments_paginated_date_${limitValue}_${offset}_${searchQuery}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      let query = `SELECT * FROM "SaleDocument"`;
      let countQuery = `SELECT COUNT(*) FROM "SaleDocument"`;
      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      if (searchQuery) {
        query += ` WHERE "CustomerName" ILIKE $1 OR "DocumentNumber" ILIKE $1 OR "NumberPrefix" ILIKE $1`;
        countQuery += ` WHERE "CustomerName" ILIKE $1 OR "DocumentNumber" ILIKE $1 OR "NumberPrefix" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      query += ` ORDER BY "DocumentDate" DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;

      queryParams.push(limitValue);
      queryParams.push(offset);

      try {
        const [saleResult, totalResult] = await Promise.all([
          this.pool.query(query, queryParams),
          this.pool.query(countQuery, countParams),
        ]);

        const totalSaleDocuments = parseInt(totalResult.rows[0].count, 10);
        const totalPages =
          totalSaleDocuments > 0
            ? Math.ceil(totalSaleDocuments / limitValue)
            : 0;

        const response = {
          totalSaleDocuments,
          totalPages,
          saleDocuments: saleResult.rows,
        };

        // Cacher le résultat pour 1 heure
        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return response;
      } catch (error) {
        this.logger.error(
          `Error while paginating SaleDocuments with query: ${searchQuery}`,
          error.message,
        );
        return [];
      }
    }
  }

  async findLineByDocId(Id: string) {
    this.logger.log(`Finding sale document lines with DocumentId: ${Id}`);

    const query = `
      SELECT *
      FROM "SaleDocumentLine"
      WHERE "DocumentId" = $1;
    `;

    try {
      const result = await this.pool.query(query, [Id]);
      return result.rows;
    } catch (error) {
      this.logger.error(
        `Error while finding sale document lines with DocumentId: ${Id}`,
        error.message,
      );
      return [];
    }
  }

  async paginateByCategory(category: string, limit: number, page: number) {
    this.logger.log(`Paginating SaleDocuments by category: ${category}`);

    const limitValue = limit > 0 ? limit : 10;
    const offset = page * limitValue;

    const cacheKey = `saleDocuments_paginated_by_category_${category}_${limitValue}_${offset}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      let query = `SELECT * FROM "SaleDocument" WHERE "NumberPrefix" = $1`;
      const countQuery = `SELECT COUNT(*) FROM "SaleDocument" WHERE "NumberPrefix" = $1`;
      const queryParams: (string | number)[] = [category];
      const countParams: (string | number)[] = [category];

      query += ` ORDER BY "NumberPrefix" DESC LIMIT $2 OFFSET $3`;

      queryParams.push(limitValue);
      queryParams.push(offset);

      try {
        const [saleResult, totalResult] = await Promise.all([
          this.pool.query(query, queryParams),
          this.pool.query(countQuery, countParams),
        ]);

        const totalSaleDocuments = parseInt(totalResult.rows[0].count, 10);
        const totalPages =
          totalSaleDocuments > 0
            ? Math.ceil(totalSaleDocuments / limitValue)
            : 0;

        const response = {
          totalSaleDocuments,
          totalPages,
          saleDocuments: saleResult.rows,
        };

        // Cacher le résultat pour 1 heure
        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return response;
      } catch (error) {
        this.logger.error(
          `Error while paginating SaleDocuments by category: ${category}`,
          error.message,
        );
        return [];
      }
    }
  }

  async getMonthlyIncome(month: number, year: number) {
    this.logger.log(`Fetching monthly income for ${month}/${year}`);

    const previousMonth = month === 1 ? 12 : month - 1;
    const previousYear = month === 1 ? year - 1 : year;

    const query = `
      WITH current_month AS (
        SELECT 
          "NumberPrefix",
          COUNT(*) AS document_count,
          SUM("TotalDueAmount") AS total_due_amount
        FROM 
          "SaleDocument"
        WHERE 
          EXTRACT(MONTH FROM "DocumentDate") = $1
          AND EXTRACT(YEAR FROM "DocumentDate") = $2
        GROUP BY 
          "NumberPrefix"
      ),
      previous_month AS (
        SELECT 
          "NumberPrefix",
          COUNT(*) AS document_count,
          SUM("TotalDueAmount") AS total_due_amount
        FROM 
          "SaleDocument"
        WHERE 
          EXTRACT(MONTH FROM "DocumentDate") = $3
          AND EXTRACT(YEAR FROM "DocumentDate") = $4
        GROUP BY 
          "NumberPrefix"
      )
      SELECT 
        cm."NumberPrefix",
        cm.document_count AS current_document_count,
        cm.total_due_amount AS current_total_due,
        pm.document_count AS previous_document_count,
        pm.total_due_amount AS previous_total_due,
        CASE 
          WHEN pm.total_due_amount > 0 THEN 
            ROUND(((cm.total_due_amount - pm.total_due_amount) / pm.total_due_amount) * 100, 2)
          ELSE 
            NULL
        END AS percentage_change
      FROM 
        current_month cm
      LEFT JOIN 
        previous_month pm ON cm."NumberPrefix" = pm."NumberPrefix"
      ORDER BY 
        cm."NumberPrefix";
    `;

    try {
      const result = await this.pool.query(query, [
        month,
        year,
        previousMonth,
        previousYear,
      ]);

      // Formatage du résultat
      const incomeByPrefix = result.rows.map((row) => ({
        numberPrefix: row.NumberPrefix,
        currentMonth: {
          documentCount: parseInt(row.current_document_count, 10),
          totalDueAmount: parseFloat(row.current_total_due),
        },
        previousMonth: {
          documentCount: parseInt(row.previous_document_count || '0', 10),
          totalDueAmount: parseFloat(row.previous_total_due || '0'),
        },
        percentageChange: row.percentage_change || 0,
      }));

      return incomeByPrefix;
    } catch (error) {
      this.logger.error('Error fetching monthly income', error.message);
      return [];
    }
  }

  private async fetchData(url: string, dataType: string) {
    try {
      const response = await fetch(url, {
        headers: {
          'x-service-auth': 'trusted-service-key',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${dataType}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      this.logger.error(
        `Error fetching ${dataType} from ${url}`,
        error.message,
      );
      throw error;
    }
  }
}

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
        query += ` WHERE "CustomerId" ILIKE $1 OR "CustomerName" ILIKE $1 OR "DocumentNumber" ILIKE $1`;
        countQuery += ` WHERE "CustomerId" ILIKE $1 OR "CustomerName" ILIKE $1 OR "DocumentNumber" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      query += ` ORDER BY CAST(regexp_replace("DocumentNumber", '\\D', '', 'g') AS INTEGER) ASC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;

      queryParams.push(limitValue);
      queryParams.push(offset);

      try {
        const [saleResult, totalResult] = await Promise.all([
          this.pool.query(query, queryParams),
          this.pool.query(countQuery, countParams),
        ]);

        console.log('Sale documents:', saleResult.rows);

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

        // Mise en cache du résultat
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

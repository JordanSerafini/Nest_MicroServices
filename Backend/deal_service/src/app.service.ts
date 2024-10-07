import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { CustomLogger } from './logging/custom-logger.service';
import { Pool } from 'pg';

@Injectable()
export class DealService {
  private readonly logger = new CustomLogger('DealService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {
    this.logger.log('Initializing DealService...');

    this.initializeConnections();
  }

  async initializeConnections() {
    try {
      await this.pool.query('SELECT 1');
      this.logger.log('PostgreSQL connection established');
    } catch (err) {
      this.logger.error('Failed to connect to PostgreSQL', err);
    }

    try {
      await this.redisClient.ping();
      this.logger.log('Redis connection established');
    } catch (err) {
      this.logger.error('Failed to connect to Redis', err);
    }
  }

  async paginate(
    email: string,
    searchQuery: string,
    limit: number,
    offset: number,
  ) {
    const cacheKey = `deal_paginated_${email}_${searchQuery}_${limit}_${offset}`;

    try {
      const cachedData = await this.redisClient.get(cacheKey);
      if (cachedData) {
        this.logger.log('Cache hit');
        return JSON.parse(cachedData);
      } else {
        this.logger.log('Cache miss');

        let query = `
        SELECT 
          d.*, 
          COALESCE(di.items, '[]') AS items,
          COALESCE(dc.customer, '{}'::json) AS customer
        FROM "Deal" d
        LEFT JOIN (
          -- Jointure pour DealItems
          SELECT 
            "DealItem"."DealId", 
            json_agg("DealItem") AS items
          FROM "DealItem"
          GROUP BY "DealItem"."DealId"
        ) di ON d."Id" = di."DealId"
        LEFT JOIN (
          -- Jointure pour DealCustomer, retourne un seul client
          SELECT 
            "DealCustomer"."DealId", 
            json_build_object(
              'Id', "DealCustomer"."Id", 
              'Name', "DealCustomer"."Name", 
              'Turnover', "DealCustomer"."Turnover", 
              'InvoiceDefault', "DealCustomer"."InvoiceDefault"
            ) AS customer
          FROM "DealCustomer"
          GROUP BY "DealCustomer"."DealId"
        ) dc ON d."Id" = dc."DealId"
      `;

        let countQuery = `SELECT COUNT(*) FROM "Deal"`;
        const queryParams: (string | number)[] = [];
        const countParams: (string | number)[] = [];

        if (searchQuery) {
          query += ` WHERE d."Caption" ILIKE $1`;
          countQuery += ` WHERE d."Caption" ILIKE $1`;
          queryParams.push(`%${searchQuery}%`);
          countParams.push(`%${searchQuery}%`);
        }

        queryParams.push(limit);
        queryParams.push(offset);

        query += `
        ORDER BY d."Caption" ASC 
        LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}
      `;

        const [dealResult, totalResult] = await Promise.all([
          this.pool.query(query, queryParams),
          this.pool.query(countQuery, countParams),
        ]);

        const totalDeal = parseInt(totalResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalDeal / limit);

        const response = {
          totalDeal,
          totalPages,
          deals: dealResult.rows,
        };

        // Mettre en cache les résultats dans Redis
        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return response;
      }
    } catch (error) {
      this.logger.error('Error during pagination', error);
      throw new Error('Failed to paginate deals');
    }
  }
}

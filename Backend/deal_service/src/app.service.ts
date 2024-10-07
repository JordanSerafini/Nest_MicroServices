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
          SELECT 
            "DealItem"."DealId", 
            json_agg("DealItem") AS items
          FROM "DealItem"
          GROUP BY "DealItem"."DealId"
        ) di ON d."Id" = di."DealId"
        LEFT JOIN (
          SELECT 
            "DealCustomer"."DealId", 
            json_build_object(
              'Id', "DealCustomer"."Id", 
              'Name', "DealCustomer"."Name"
            ) AS customer
          FROM "DealCustomer"
          GROUP BY "DealCustomer"."DealId", "DealCustomer"."Id", "DealCustomer"."Name"
        ) dc ON d."Id" = dc."DealId"
        `;

        let countQuery = `SELECT COUNT(*) FROM "Deal"`;
        const queryParams: (string | number)[] = [];
        const countParams: (string | number)[] = [];

        // Si searchQuery est fourni et non vide, ajoutez la condition WHERE
        if (searchQuery && searchQuery.trim() !== '') {
          query += ` WHERE d."Caption" ILIKE $1::text`;
          countQuery += ` WHERE d."Caption" ILIKE $1::text`;
          queryParams.push(`%${searchQuery}%`);
          countParams.push(`%${searchQuery}%`);
        }

        // Ajout des paramètres de pagination
        queryParams.push(limit);
        queryParams.push(offset);

        // Correction des index pour LIMIT et OFFSET
        if (searchQuery && searchQuery.trim() !== '') {
          query += `
            ORDER BY d."Caption" ASC 
            LIMIT $2 OFFSET $3
          `;
        } else {
          query += `
            ORDER BY d."Caption" ASC 
            LIMIT $1 OFFSET $2
          `;
        }

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

        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return response;
      }
    } catch (error) {
      this.logger.error('Error during pagination', error);
      throw new Error('Failed to paginate deals');
    }
  }
}

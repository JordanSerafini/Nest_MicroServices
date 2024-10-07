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
  ) {}

  async paginate(
    email: string,
    searchQuery: string,
    limit: number,
    offset: number,
  ) {
    const cacheKey = `deal_paginated_${limit}_${offset}_${searchQuery}`;

    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      let query = `SELECT * FROM "Deal"`;
      let countQuery = `SELECT COUNT(*) FROM "Deal"`;
      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      if (searchQuery) {
        query += ` WHERE "Caption" ILIKE $1`;
        countQuery += ` WHERE "Caption" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      queryParams.push(limit);
      queryParams.push(offset);

      query += ` ORDER BY "Caption" ASC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
      countQuery += `;`;

      const [dealResult, totalResult] = await Promise.all([
        this.pool.query(query, queryParams),
        this.pool.query(countQuery, countParams),
      ]);

      const totalDeal = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalDeal / limit);

      const response = {
        totalDeal,
        totalPages,
        customers: dealResult.rows,
      };

      await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

      return response;
    }
  }
}

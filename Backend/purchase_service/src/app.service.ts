import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CustomLogger } from './logging/custom-logger.service';
import { RedisClientType } from 'redis';
import { Pool } from 'pg';

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
    searchQuery: string,
  ) {
    const cacheKey = `purchase_paginated_${limit}_${offset}_${searchQuery}`;

    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      try {
        // Base query
        let query = `SELECT * FROM "PurchaseDocument"`;
        const queryParams = [email, limit, offset];

        if (searchQuery) {
          query += `AND ("description" ILIKE $4 OR "title" ILIKE $4) `;
          queryParams.push(`%${searchQuery}%`);
        }

        query += `ORDER BY "created_at" DESC LIMIT $2 OFFSET $3`;

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

  async findOneById(Id: string, email: string) {
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
}

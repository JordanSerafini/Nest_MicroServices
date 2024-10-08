import { Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from './logging/custom-logger.service';
import { RedisClientType } from 'redis';
import { Pool } from 'pg';

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
      WHERE email = $1
      AND (description ILIKE $2 OR title ILIKE $2)
      ORDER BY created_at DESC
      LIMIT $3
      OFFSET $4
    `;

    const queryParams = [`%${searchQuery}%`, limit, offset];
    try {
      const result = await this.pool.query(query, queryParams);
      return result.rows;
    } catch (error) {
      this.logger.error('Error during pagination', error);
      throw new Error('Failed to paginate maintenance');
    }
  }
}

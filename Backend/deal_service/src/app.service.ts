import { Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from './logging/custom-logger.service';
import { RedisClientType } from 'redis';
import { Pool } from 'pg';

@Injectable()
export class DealService {
  private readonly logger = new CustomLogger('DealService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}

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
    return 'This is the response from the purchase service';
  }

  async findOne() {
    return 'This is the response from the purchase service';
  }
}

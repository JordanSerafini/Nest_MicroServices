import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CustomLogger } from './logging/custom-logger.service';
import { Pool } from 'pg';

@Injectable()
export class SaleService {
  private readonly logger = new CustomLogger('SaleService');

  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async findOne(Id: string, email: string) {
    this.logger.log(`Finding sale with ID: ${Id}, User: ${email}`);

    const query = `
      SELECT * FROM "SaleDocument" WHERE "Id" = $1;
    `;

    try {
      const result = await this.pool.query(query, [Id]);
      if (result.rows.length === 0) {
        this.logger.error(`No sale found with ID: ${Id}`, `User: ${email}`);
        return null;
      }

      const saleEvent = result.rows[0];

      return {
        saleEvent,
      };
    } catch (error) {
      this.logger.error(
        `Error while finding sale with ID: ${Id}`,
        `User: ${email}`,
      );
      return null;
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

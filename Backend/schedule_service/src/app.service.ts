import { Inject, Injectable } from '@nestjs/common';
import { CustomLogger } from './logging/custom-logger.service';
import { Pool } from 'pg';

@Injectable()
export class ScheduleService {
  private readonly logger = new CustomLogger('ScheduleService');

  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async findOne(Id: string, email: string) {
    this.logger.log(`Finding schedule with ID: ${Id}, User: ${email}`);

    const query = `
      SELECT *
      FROM "ScheduleEvent"
      WHERE "Id" = $1;
    `;

    try {
      const result = await this.pool.query(query, [Id]);
      if (result.rows.length === 0) {
        this.logger.error(`No schedule found with ID: ${Id}`, `User: ${email}`);
        return null;
      }

      this.logger.log(`Schedule found with ID: ${Id}, User: ${email}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `Error finding schedule with ID: ${Id}`,
        ` User: ${email}`,
      );
      throw error;
    }
  }
}

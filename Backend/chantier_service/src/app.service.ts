import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConstructionSiteDto } from './dto/create-chantier.dto';
import { UpdateChantierDto } from './dto/update-chantier.dto';
import { Pool } from 'pg';
import { ConstructionSite } from './entities/chantier.entity';
import { CustomLogger } from './logging/chantier-logger.service';

@Injectable()
export class ChantierService {
  private readonly logger = new CustomLogger('ChantierService');

  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async findAll(email: string): Promise<any[]> {
    this.logger.log(`Fetching all chantiers, User: ${email}`);
    try {
      const query = `
        SELECT 
          ConstructionSite.*, 
          row_to_json(customer.*) AS customer
        FROM "ConstructionSite" ConstructionSite
        JOIN "Customer" customer ON ConstructionSite."CustomerId" = customer.id
        GROUP BY ConstructionSite."Id", customer.*
      `;
      const result = await this.pool.query(query);

      if (result.rows.length === 0) {
        this.logger.warn(`No chantiers found for User: ${email}`);
        return [];
      }

      const chantiers = result.rows.map((row) => ({
        ...row,
        customer: row.customer,
        personnel: row.personnel || [],
        materiels: row.materiels || [],
      }));

      this.logger.log(
        `Found ${result.rows.length} chantiers for User: ${email}`,
      );
      return chantiers;
    } catch (error) {
      this.logger.error(
        `Failed to fetch all chantiers, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: number, email: string): Promise<any> {
    this.logger.log(`Fetching chantier with ID: ${id}, User: ${email}`);

    try {
      const query = `
          SELECT 
            cs.*, 
            row_to_json(customer) AS customer
              FROM "ConstructionSite" cs
              JOIN "Customer" customer ON cs."CustomerId" = customer."Id"
          WHERE cs."id" = $1
        `;
      const values = [id];
      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        const notFoundMessage = `Chantier with ID: ${id} not found, User: ${email}`;
        this.logger.warn(notFoundMessage);
        throw new NotFoundException(notFoundMessage);
      }

      const chantier = {
        ...result.rows[0],
        customer: result.rows[0].customer,
      };

      this.logger.log(
        `Chantier with ID: ${id} found, including full customer details, User: ${email}`,
      );

      return chantier;
    } catch (error) {
      this.logger.error(
        `Failed to fetch chantier with ID: ${id}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async paginate(
    {
      limit,
      offset,
      searchQuery,
    }: { limit: number; offset: number; searchQuery: string },
    email: string,
  ): Promise<{
    totalChantiers: number;
    totalPages: number;
    chantiers: any[];
  }> {
    this.logger.log(
      `Fetching paginated ConstructionSites with limit: ${limit}, offset: ${offset}, searchQuery: "${searchQuery}", User: ${email}`,
    );

    try {
      let query = `
        SELECT 
          cs.*, 
          row_to_json(customer) AS customer
            FROM "ConstructionSite" cs
            JOIN "Customer" customer ON cs."CustomerId" = customer."Id"

      `;

      let countQuery = `SELECT COUNT(*) FROM "ConstructionSite" cs`;
      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      if (searchQuery) {
        query += ` WHERE cs."Caption" ILIKE $1`;
        countQuery += ` WHERE cs."Caption" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      // Pagination
      queryParams.push(limit);
      queryParams.push(offset);
      query += ` ORDER BY cs."Caption" ASC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
      countQuery += `;`;

      const [chantierResult, totalResult] = await Promise.all([
        this.pool.query(query, queryParams),
        this.pool.query(countQuery, countParams),
      ]);

      const totalChantiers = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalChantiers / limit);

      const chantiers = chantierResult.rows.map((row) => ({
        ...row,
        customer: row.customer,
      }));

      this.logger.log(
        `Found ${chantierResult.rows.length} chantiers for user: ${email}, total chantiers: ${totalChantiers}, total pages: ${totalPages}`,
      );

      return {
        totalChantiers,
        totalPages,
        chantiers,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch paginated ConstructionSites for user: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async create(
    createChantierDto: CreateConstructionSiteDto,
    email: string,
  ): Promise<ConstructionSite> {
    this.logger.log(
      `Creating a new chantier with data: ${JSON.stringify(createChantierDto)}, User: ${email}`,
    );

    const fields: string[] = [];
    const placeholders: string[] = [];
    const values: any[] = [];

    Object.entries(createChantierDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(this.toSnakeCase(key));
        placeholders.push(`$${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      this.logger.error(
        `No data provided to create a chantier, User: ${email}`,
        '',
      );
      throw new Error('No data provided to create a chantier.');
    }

    try {
      const query = `
        INSERT INTO "Chantier" (${fields.join(', ')})
        VALUES (${placeholders.join(', ')})
        RETURNING *;
      `;

      const result = await this.pool.query(query, values);
      this.logger.log(
        `Chantier created with ID: ${result.rows[0].id}, User: ${email}`,
      );
      return result.rows[0] as ConstructionSite;
    } catch (error) {
      this.logger.error(
        `Failed to create chantier, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(
    id: string | number,
    updateChantierDto: UpdateChantierDto,
    email: string,
  ): Promise<ConstructionSite> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    this.logger.log(
      `Updating chantier with ID: ${parsedId} with data: ${JSON.stringify(updateChantierDto)}, User: ${email}`,
    );

    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updateChantierDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(`${this.toSnakeCase(key)} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      this.logger.error(
        `No data provided to update the chantier, User: ${email}`,
        '',
      );
      throw new Error('No data provided to update the chantier.');
    }

    values.push(parsedId);

    try {
      const query = `
        UPDATE "Chantier"
        SET ${fields.join(', ')}
        WHERE id = $${values.length}
        RETURNING *;
      `;

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        this.logger.warn(
          `Chantier with ID: ${parsedId} not found, User: ${email}`,
        );
        throw new NotFoundException(`Chantier with id ${parsedId} not found`);
      }

      this.logger.log(`Chantier with ID: ${parsedId} updated, User: ${email}`);
      return result.rows[0] as ConstructionSite;
    } catch (error) {
      this.logger.error(
        `Failed to update chantier with ID: ${parsedId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string | number, email: string): Promise<ConstructionSite> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    this.logger.log(`Deleting chantier with ID: ${parsedId}, User: ${email}`);

    try {
      const query = `DELETE FROM "Chantier" WHERE id = $1 RETURNING *`;
      const values = [parsedId];

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        this.logger.warn(
          `Chantier with ID: ${parsedId} not found, User: ${email}`,
        );
        throw new NotFoundException(`Chantier with id ${parsedId} not found`);
      }

      this.logger.log(`Chantier with ID: ${parsedId} deleted, User: ${email}`);
      return result.rows[0] as ConstructionSite;
    } catch (error) {
      this.logger.error(
        `Failed to delete chantier with ID: ${parsedId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

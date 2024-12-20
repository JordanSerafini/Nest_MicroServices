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

  async findOne(id: string, email: string): Promise<any> {
    this.logger.log(`Fetching chantier with ID: ${id}, User: ${email}`);

    try {
      const query = `
          SELECT 
            cs.*, 
            row_to_json(customer) AS customer
              FROM "ConstructionSite" cs
              JOIN "Customer" customer ON cs."CustomerId" = customer."Id"
          WHERE cs."Id" = $1
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
      const query = `
        SELECT *
        FROM (
          SELECT DISTINCT ON (cs."Id")
            cs.*, 
            row_to_json(customer) AS customer
          FROM "ConstructionSite" cs
          JOIN "Customer" customer ON cs."CustomerId" = customer."Id"
          ${searchQuery ? `WHERE cs."Caption" ILIKE $1` : ''}
          ORDER BY cs."Id", cs."StartDate" DESC
        ) AS sorted_chantiers
        ORDER BY sorted_chantiers."StartDate" DESC
        LIMIT $${searchQuery ? 2 : 1} OFFSET $${searchQuery ? 3 : 2};
      `;

      const countQuery = `SELECT COUNT(DISTINCT cs."Id") FROM "ConstructionSite" cs ${searchQuery ? `WHERE cs."Caption" ILIKE $1` : ''};`;

      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      // Ajoute le paramètre de recherche si `searchQuery` est défini
      if (searchQuery) {
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      // Ajoute les paramètres pour la pagination
      queryParams.push(limit);
      queryParams.push(offset);

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

  //* ----------------------------------------------------- Construction Site Documents

  async getConstructionSiteDocuments(
    chantierDocId: string,
    email: string,
  ): Promise<any[]> {
    this.logger.log(
      `Fetching documents for chantier with ID: ${chantierDocId}, User: ${email}`,
    );

    try {
      const query = `
        SELECT * FROM "ConstructionSiteReferenceDocument" WHERE "ConstructionSiteId" = $1
      `;
      const values = [chantierDocId];
      const result = await this.pool.query(query, values);

      this.logger.log(
        `Found ${result.rows.length} documents for chantier with ID: ${chantierDocId}, User: ${email}`,
      );

      return result.rows;
    } catch (error) {
      this.logger.error(
        `Failed to fetch documents for chantier with ID: ${chantierDocId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getConstructionSiteDocumentLine(
    chantierDocId: number | string,
    email: string,
  ): Promise<any> {
    this.logger.log(
      `Fetching document line with ID:  ${chantierDocId}, User: ${email}`,
    );

    try {
      const query = `
        SELECT * FROM "ConstructionSiteReferenceDocumentLine" WHERE "DocumentId" = $1
      `;
      const values = [chantierDocId];
      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        this.logger.warn(
          `Document line with ID: : ${chantierDocId}, User: ${email}`,
        );
        throw new NotFoundException(
          `Document line with ID: : ${chantierDocId}`,
        );
      }

      this.logger.log(
        `Found document line with ID:  ${chantierDocId}, User: ${email}`,
      );

      return result.rows;
    } catch (error) {
      this.logger.error(
        `Failed to fetch document line with ID:  ${chantierDocId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getDealDocument(DealId: string, email: string): Promise<any> {
    this.logger.log(
      `Fetching deal document with ID:  ${DealId}, User: ${email}`,
    );

    try {
      const query = `
        SELECT * FROM "Deal" WHERE "Id" = $1
      `;
      const values = [DealId];
      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        this.logger.warn(`Deal document with ID: : ${DealId}, User: ${email}`);
        throw new NotFoundException(`Deal document with ID: : ${DealId}`);
      }

      this.logger.log(
        `Found deal document with ID:  ${DealId}, User: ${email}`,
      );

      return result.rows;
    } catch (error) {
      this.logger.error(
        `Failed to fetch deal document with ID:  ${DealId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

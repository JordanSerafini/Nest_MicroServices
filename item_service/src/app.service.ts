import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Pool } from 'pg';
import { Item } from './entities/item.entity';
import { CustomLogger } from './logging/custom-logger.service';

@Injectable()
export class ItemService {
  private readonly logger = new CustomLogger('ItemService');

  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async create(createItemDto: CreateItemDto, email: string): Promise<Item> {
    this.logger.log(
      `Creating a new item with data: ${JSON.stringify(createItemDto)}, User: ${email}`,
    );

    const fields: string[] = [];
    const placeholders: string[] = [];
    const values: any[] = [];

    Object.entries(createItemDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(this.toSnakeCase(key));
        placeholders.push(`$${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      this.logger.error(
        `No data provided to create an item, User: ${email}`,
        '',
      );
      throw new Error('No data provided to create an item.');
    }

    try {
      const query = `
        INSERT INTO "Item" (${fields.join(', ')})
        VALUES (${placeholders.join(', ')})
        RETURNING *;
      `;

      const result = await this.pool.query(query, values);
      this.logger.log(
        `Item created with ID: ${result.rows[0].id}, User: ${email}`,
      );
      return result.rows[0] as Item;
    } catch (error) {
      this.logger.error(
        `Failed to create item, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(email: string): Promise<Item[]> {
    this.logger.log(`Fetching all items, User: ${email}`);
    try {
      const result = await this.pool.query('SELECT * FROM "Item"');
      this.logger.log(`Found ${result.rows.length} items, User: ${email}`);
      return result.rows as Item[];
    } catch (error) {
      this.logger.error(
        `Failed to fetch all items, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: string | number, email: string): Promise<Item> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      const errorMessage = `Invalid ID received: ${id}, User: ${email}`;
      this.logger.error(errorMessage, 'BadRequestException');
      throw new BadRequestException(errorMessage);
    }

    this.logger.log(`Fetching item with ID: ${parsedId}, User: ${email}`);
    try {
      const query = `SELECT * FROM "Item" WHERE id = $1`;
      const values = [parsedId];
      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        const notFoundMessage = `Item with ID: ${parsedId} not found, User: ${email}`;
        this.logger.warn(notFoundMessage);
        throw new NotFoundException(notFoundMessage);
      }

      this.logger.log(`Item with ID: ${parsedId} found, User: ${email}`);
      return result.rows[0] as Item;
    } catch (error) {
      this.logger.error(
        `Failed to fetch item with ID: ${parsedId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(
    id: string | number,
    updateItemDto: UpdateItemDto,
    email: string,
  ): Promise<Item> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    this.logger.log(
      `Updating item with ID: ${parsedId} with data: ${JSON.stringify(updateItemDto)}, User: ${email}`,
    );

    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updateItemDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(`${this.toSnakeCase(key)} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      this.logger.error(
        `No data provided to update the item, User: ${email}`,
        '',
      );
      throw new Error('No data provided to update the item.');
    }

    values.push(parsedId);

    try {
      const query = `
        UPDATE "Item"
        SET ${fields.join(', ')}
        WHERE id = $${values.length}
        RETURNING *;
      `;

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        this.logger.warn(`Item with ID: ${parsedId} not found, User: ${email}`);
        throw new NotFoundException(`Item with id ${parsedId} not found`);
      }

      this.logger.log(`Item with ID: ${parsedId} updated, User: ${email}`);
      return result.rows[0] as Item;
    } catch (error) {
      this.logger.error(
        `Failed to update item with ID: ${parsedId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string | number, email: string): Promise<Item> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    this.logger.log(`Deleting item with ID: ${parsedId}, User: ${email}`);

    try {
      const query = `DELETE FROM "Item" WHERE id = $1 RETURNING *`;
      const values = [parsedId];

      const result = await this.pool.query(query, values);

      if (result.rows.length === 0) {
        this.logger.warn(`Item with ID: ${parsedId} not found, User: ${email}`);
        throw new NotFoundException(`Item with id ${parsedId} not found`);
      }

      this.logger.log(`Item with ID: ${parsedId} deleted, User: ${email}`);
      return result.rows[0] as Item;
    } catch (error) {
      this.logger.error(
        `Failed to delete item with ID: ${parsedId}, User: ${email}, Error: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

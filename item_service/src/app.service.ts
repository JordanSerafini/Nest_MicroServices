import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Pool } from 'pg';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
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
      throw new Error('No data provided to create an item.');
    }

    const query = `
      INSERT INTO "Item" (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;

    const result = await this.pool.query(query, values);
    return result.rows[0] as Item;
  }

  async findAll(): Promise<Item[]> {
    const result = await this.pool.query('SELECT * FROM "Item"');
    return result.rows as Item[];
  }

  async findOne(id: number): Promise<Item> {
    const query = `SELECT * FROM "Item" WHERE id = $1`;
    const values = [id];
    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return result.rows[0] as Item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updateItemDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(`${this.toSnakeCase(key)} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      throw new Error('No data provided to update the item.');
    }

    values.push(id); // Ajouter l'id à la fin des valeurs

    const query = `
      UPDATE "Item"
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return result.rows[0] as Item;
  }

  async remove(id: number): Promise<Item> {
    const query = `DELETE FROM "Item" WHERE id = $1 RETURNING *`;
    const values = [id];

    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return result.rows[0] as Item;
  }
}

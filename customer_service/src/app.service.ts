import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { Pool } from 'pg';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    const fields: string[] = [];
    const placeholders: string[] = [];
    const values: any[] = [];

    Object.entries(createCustomerDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(this.toSnakeCase(key));
        placeholders.push(`$${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      throw new Error('No data provided to create a customer.');
    }

    // Construire la requête SQL dynamiquement
    const query = `
      INSERT INTO "Customer" (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;

    const result = await this.pool.query(query, values);
    return result.rows[0] as Customer;
  }

  async findAll(): Promise<any[]> {
    const result = await this.pool.query('SELECT * FROM "Customer"');
    return result.rows as Customer[];
  }

  async findOne(id: number): Promise<any> {
    const query = `SELECT * FROM "Customer" WHERE id = $1`;
    const values = [id];
    const result = await this.pool.query(query, values);
    return result.rows[0] as Customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<any> {
    const query = `
      UPDATE "Customer"
      SET name = $1, email = $2, address = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [
      updateCustomerDto.Name,
      updateCustomerDto.MainInvoicingContact_Email,
      updateCustomerDto.MainInvoicingAddress_Address1,
      id,
    ];

    const result = await this.pool.query(query, values);
    return result.rows[0] as Customer;
  }

  async remove(id: number): Promise<any> {
    const query = `DELETE FROM "Customer" WHERE id = $1 RETURNING *`;
    const values = [id];

    const result = await this.pool.query(query, values);
    return result.rows[0] as Customer;
  }
}

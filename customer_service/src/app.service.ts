import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Pool } from 'pg';
import { Customer } from './entities/customer.entity';
import { CustomLogger } from './logging/custom-logger.service';

@Injectable()
export class CustomerService {
  private readonly logger = new CustomLogger('CustomerService');

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
      this.logger.error('No data provided to create a customer.', '');
      throw new Error('No data provided to create a customer.');
    }

    const query = `
      INSERT INTO "Customer" (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, values);
      this.logger.log(`Customer created with ID: ${result.rows[0].id}`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error('Error creating customer', error.stack || '');
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const result = await this.pool.query('SELECT * FROM "Customer"');
      this.logger.log('Fetched all customers');
      return result.rows as Customer[];
    } catch (error) {
      this.logger.error('Error fetching customers', error.stack || '');
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    const query = `SELECT * FROM "Customer" WHERE id = $1`;
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length > 0) {
        this.logger.log(`Customer with ID: ${id} found`);
        return result.rows[0] as Customer;
      } else {
        this.logger.warn(`Customer with ID: ${id} not found`);
        return null;
      }
    } catch (error) {
      this.logger.error(
        `Error finding customer with ID: ${id}`,
        error.stack || '',
      );
      throw error;
    }
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

    try {
      const result = await this.pool.query(query, values);
      this.logger.log(`Customer with ID: ${id} updated`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error updating customer with ID: ${id}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async remove(id: number): Promise<any> {
    const query = `DELETE FROM "Customer" WHERE id = $1 RETURNING *`;
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      this.logger.log(`Customer with ID: ${id} deleted`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error deleting customer with ID: ${id}`,
        error.stack || '',
      );
      throw error;
    }
  }
}

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

  async create(
    createCustomerDto: CreateCustomerDto,
    email: string,
  ): Promise<any> {
    this.logger.log(
      `Creating a new customer with data: ${JSON.stringify(createCustomerDto)}, User: ${email}`,
    );

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
      this.logger.error(
        `No data provided to create a customer, User: ${email}`,
        '',
      );
      throw new Error('No data provided to create a customer.');
    }

    const query = `
      INSERT INTO "Customer" (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, values);
      this.logger.log(
        `Customer created with ID: ${result.rows[0].id}, User: ${email}`,
      );
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error creating customer, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async findAll(email: string): Promise<any[]> {
    try {
      const result = await this.pool.query('SELECT * FROM "Customer"');
      this.logger.log(`Fetched all customers, User: ${email}`);
      return result.rows as Customer[];
    } catch (error) {
      this.logger.error(
        `Error fetching customers, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async findOne(id: number, email: string): Promise<any> {
    const query = `SELECT * FROM "Customer" WHERE id = $1`;
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length > 0) {
        this.logger.log(`Customer with ID: ${id} found, User: ${email}`);
        return result.rows[0] as Customer;
      } else {
        this.logger.warn(`Customer with ID: ${id} not found, User: ${email}`);
        return null;
      }
    } catch (error) {
      this.logger.error(
        `Error finding customer with ID: ${id}, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
    email: string,
  ): Promise<any> {
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
      this.logger.log(`Customer with ID: ${id} updated, User: ${email}`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error updating customer with ID: ${id}, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async remove(id: number, email: string): Promise<any> {
    const query = `DELETE FROM "Customer" WHERE id = $1 RETURNING *`;
    const values = [id];

    try {
      const result = await this.pool.query(query, values);
      this.logger.log(`Customer with ID: ${id} deleted, User: ${email}`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error deleting customer with ID: ${id}, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }
}

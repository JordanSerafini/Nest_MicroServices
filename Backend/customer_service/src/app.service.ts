import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
  ): Promise<Customer> {
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

  async findAll(email: string): Promise<Customer[]> {
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

  async findOne(id: string | number, email: string): Promise<Customer | null> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    const query = `SELECT * FROM "Customer" WHERE id = $1`;
    const values = [parsedId];

    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length > 0) {
        this.logger.log(`Customer with ID: ${parsedId} found, User: ${email}`);
        return result.rows[0] as Customer;
      } else {
        this.logger.warn(
          `Customer with ID: ${parsedId} not found, User: ${email}`,
        );
        throw new NotFoundException(`Customer with id ${parsedId} not found`);
      }
    } catch (error) {
      this.logger.error(
        `Error finding customer with ID: ${parsedId}, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async update(
    id: string | number,
    updateCustomerDto: UpdateCustomerDto,
    email: string,
  ): Promise<Customer> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updateCustomerDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(`${this.toSnakeCase(key)} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      this.logger.error(
        `No data provided to update the customer, User: ${email}`,
        '',
      );
      throw new Error('No data provided to update the customer.');
    }

    values.push(parsedId);

    const query = `
      UPDATE "Customer"
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length === 0) {
        this.logger.warn(
          `Customer with ID: ${parsedId} not found, User: ${email}`,
        );
        throw new NotFoundException(`Customer with id ${parsedId} not found`);
      }
      this.logger.log(`Customer with ID: ${parsedId} updated, User: ${email}`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error updating customer with ID: ${parsedId}, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }

  async remove(id: string | number, email: string): Promise<Customer> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      this.logger.error(`Invalid ID received: ${id}, '', ${email}`, '');
      throw new BadRequestException('Invalid ID');
    }

    const query = `DELETE FROM "Customer" WHERE id = $1 RETURNING *`;
    const values = [parsedId];

    try {
      const result = await this.pool.query(query, values);
      if (result.rows.length === 0) {
        this.logger.warn(
          `Customer with ID: ${parsedId} not found, User: ${email}`,
        );
        throw new NotFoundException(`Customer with id ${parsedId} not found`);
      }
      this.logger.log(`Customer with ID: ${parsedId} deleted, User: ${email}`);
      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error deleting customer with ID: ${parsedId}, User: ${email}`,
        error.stack || '',
      );
      throw error;
    }
  }
}

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
import { RedisClientType } from 'redis';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class CustomerService {
  private readonly logger = new CustomLogger('CustomerService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  private toSnakeCase(str: string): string {
    return str
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/^_/, '');
  }

  private writeCustomerToCSV(customer: any, type: 'error' | 'validated') {
    //console.log('ecriture du csv');

    const baseDir = process.cwd();
    const dir = path.join(baseDir, type);
    const fileName =
      type === 'error' ? 'error_customer.csv' : 'validated_customer.csv';
    const filePath = path.join(dir, fileName);

    //console.log(`Base directory: ${baseDir}`);
    //console.log(`Chemin complet du fichier CSV : ${filePath}`);

    try {
      // Créer le répertoire s'il n'existe pas
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const columns = Object.keys(customer).join(';');

      const values = Object.values(customer)
        .map((value) => {
          let outputValue = '';
          if (typeof value === 'string') {
            outputValue = value.replace(/"/g, '""');
          } else if (value === null || value === undefined) {
            outputValue = '';
          } else {
            outputValue = JSON.stringify(value).replace(/"/g, '""');
          }
          return `"${outputValue}"`;
        })
        .join(';');

      const dataLine = `${values}\n`;

      if (!fs.existsSync(filePath)) {
        const header = `${columns}\n`;
        fs.writeFileSync(filePath, header + dataLine, 'utf8');
      } else {
        const existingData = fs.readFileSync(filePath, 'utf8');
        const existingColumns = existingData.split('\n')[0];
        if (existingColumns === columns) {
          fs.appendFileSync(filePath, dataLine, 'utf8');
        } else {
          console.error(
            "Column mismatch: The structure of the customer object does not match the existing file's columns.",
          );
        }
      }
    } catch (err) {
      console.error(
        `Erreur lors de l'écriture du fichier CSV : ${err.message}`,
      );
    }
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

    // Parcourir les champs du DTO sans conversion automatique
    Object.entries(createCustomerDto).forEach(([key, value], index) => {
      if (value !== undefined && value !== null) {
        fields.push(`"${key}"`);
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

    // Log des noms de colonnes et de la requête pour déboguer
    this.logger.log(`Fields: ${fields.join(', ')}`);
    const query = `
      INSERT INTO "Customer" (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *;
    `;
    this.logger.log(`Query: ${query}`);
    this.logger.log(`Values: ${JSON.stringify(values)}`);

    try {
      const result = await this.pool.query(query, values);
      this.logger.log(
        `Customer created with ID: ${result.rows[0].id}, User: ${email}`,
      );

      this.writeCustomerToCSV(result.rows[0] as Customer, 'validated');

      return result.rows[0] as Customer;
    } catch (error) {
      this.logger.error(
        `Error creating customer`,
        `User: ${email}, Error: ${error.message}`,
      );

      const errorData = {
        ...createCustomerDto,
        error: error.message,
        userEmail: email,
      };
      this.writeCustomerToCSV(errorData, 'error');

      throw new Error(`Failed to create customer: ${error.message}`);
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

  async paginate(
    email: string,
    limit: number,
    offset: number,
    searchQuery: string,
  ) {
    const cacheKey = `customers_paginated_${limit}_${offset}_${searchQuery}`;

    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData);
    } else {
      console.log('Cache miss');

      let query = `SELECT * FROM "Customer"`;
      let countQuery = `SELECT COUNT(*) FROM "Customer"`;
      const queryParams: (string | number)[] = [];
      const countParams: (string | number)[] = [];

      if (searchQuery) {
        query += ` WHERE "Name" ILIKE $1`;
        countQuery += ` WHERE "Name" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      queryParams.push(limit);
      queryParams.push(offset);

      query += ` ORDER BY "Name" ASC LIMIT $${
        queryParams.length - 1
      } OFFSET $${queryParams.length}`;
      countQuery += `;`;

      const [customerResult, totalResult] = await Promise.all([
        this.pool.query(query, queryParams),
        this.pool.query(countQuery, countParams),
      ]);

      const totalCustomer = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalCustomer / limit);

      const response = {
        totalCustomer,
        totalPages,
        customers: customerResult.rows,
      };

      await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

      return response;
    }
  }

  async getCustomersWithinRadius(
    email: string,
    latCentral: number,
    lonCentral: number,
    rayonM: number,
  ): Promise<Customer[]> {
    this.logger.log(
      `Fetching customers within radius ${rayonM} meters from (${latCentral}, ${lonCentral}), User: ${email}`,
    );

    const query = `
      SELECT *
      FROM (
        SELECT *,
          (6371000 * acos(
            cos(radians($1)) * cos(radians("Lat")) * cos(radians("Lon") - radians($2))
            + sin(radians($1)) * sin(radians("Lat"))
          )) AS distance
        FROM "Customer"
      ) AS subquery
      WHERE distance < $3;
    `;
    const values = [latCentral, lonCentral, rayonM];

    try {
      const result = await this.pool.query(query, values);
      return result.rows as Customer[];
    } catch (error) {
      this.logger.error(
        `Error fetching customers within radius`,
        `User: ${email}, Error: ${error.message}`,
      );
      throw new Error(
        `Failed to fetch customers within radius: ${error.message}`,
      );
    }
  }

  //*-------------------------- Coordinate
  async updateAllCustomerCoordinates(req: Request, res: Response) {
    const failedAddresses = [];

    try {
      const query = `SELECT * FROM "Customer";`;
      const result = await this.pool.query(query);
      const customers = result.rows;

      for (const customer of customers) {
        const {
          Id,
          MainInvoicingAddress_Address1,
          MainInvoicingAddress_Address2,
          MainInvoicingAddress_Address3,
          MainInvoicingAddress_ZipCode,
          MainInvoicingAddress_City,
          MainInvoicingAddress_State,
          Name,
        } = customer;
        const addressComponents = [
          MainInvoicingAddress_Address1,
          MainInvoicingAddress_Address2,
          MainInvoicingAddress_Address3,
          MainInvoicingAddress_ZipCode,
          MainInvoicingAddress_City,
          MainInvoicingAddress_State,
        ].filter(Boolean);
        const fullAddress = addressComponents.join(', ');

        if (fullAddress) {
          const success = await this.geocodeAndSave(Id, fullAddress);
          if (!success) {
            failedAddresses.push({ Id, Name, Address: fullAddress });
          }
        } else {
          console.log(`Incomplete address for customer ${Name}`);
          failedAddresses.push({ Id, Name, Address: 'Incomplete address' });
        }
      }

      this.writeFailedAddresses(failedAddresses);
      res.send(
        'Coordinates update process completed for all applicable customers.',
      );
    } catch (error) {
      console.error('Error while updating customer coordinates', error);
      res.status(500).send('Error while updating customer coordinates.');
    }
  }

  private async geocodeAndSave(customerId: string | number, address: string) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        {
          method: 'GET',
        },
      );

      // Vérifiez la réponse HTTP
      if (!response.ok) {
        console.error(
          `HTTP Error fetching geocode for address "${address}": ${response.statusText}`,
        );
        return false;
      }

      const geocodeResponse = await response.json();

      // Vérification des données dans la réponse
      if (
        geocodeResponse.length > 0 &&
        geocodeResponse[0].lat &&
        geocodeResponse[0].lon
      ) {
        const Lat = parseFloat(geocodeResponse[0].lat);
        const Lon = parseFloat(geocodeResponse[0].lon);

        if (!isNaN(Lat) && !isNaN(Lon)) {
          await this.pool.query(
            'UPDATE "Customer" SET "Lon" = $1, "Lat" = $2 WHERE "Id" = $3',
            [Lon, Lat, customerId],
          );
          console.log(
            `Coordinates successfully updated for customer ID ${customerId}: Lon=${Lon}, Lat=${Lat}`,
          );
          return true;
        } else {
          console.error(
            `Received invalid coordinates (NaN) for customer ID ${customerId}: ${address}`,
          );
          return false;
        }
      } else {
        console.error(
          `No valid coordinates found for address: "${address}". Geocode response: ${JSON.stringify(geocodeResponse)}`,
        );
        return false;
      }
    } catch (error) {
      console.error(`Error during geocoding address: "${address}"`, error);
      return false;
    }
  }

  private writeFailedAddresses(failedAddresses: FailedAddress[]) {
    const filePath = path.join(__dirname, './address/failedAddresses.csv');
    const header = 'Customer ID,Customer Name,Address\n';
    const data = failedAddresses
      .map((a) => `${a.Id},"${a.Name}","${a.Address}"`)
      .join('\n');

    // Vérifiez si le fichier existe déjà
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, header + data, 'utf8');
    } else {
      fs.appendFileSync(filePath, data + '\n', 'utf8');
    }
    console.log('Failed addresses have been written to failedAddresses.csv');
  }
}

interface FailedAddress {
  Id: number | string;
  Name: string;
  Address: string;
}

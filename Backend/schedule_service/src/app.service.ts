import { Inject, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CustomLogger } from './logging/custom-logger.service';
import { Pool } from 'pg';

@Injectable()
export class ScheduleService {
  private readonly logger = new CustomLogger('ScheduleService');

  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async findOne(Id: string, email: string) {
    this.logger.log(`Finding schedule with ID: ${Id}, User: ${email}`);

    const query = `
      SELECT 
        se.*,
        json_build_object(
          'Address1', a."AddressFields_Address1",
          'ZipCode', a."AddressFields_ZipCode",
          'City', a."AddressFields_City",
          'State', a."AddressFields_State",
          'ThirdName', a."AddressFields_ThirdName"
        ) AS address
      FROM "ScheduleEvent" se
      JOIN "Address" a ON se."AddressId" = a."Id"
      WHERE se."Id" = $1;
    `;

    try {
      const result = await this.pool.query(query, [Id]);
      if (result.rows.length === 0) {
        this.logger.error(`No schedule found with ID: ${Id}`, `User: ${email}`);
        return null;
      }

      const scheduleEvent = result.rows[0];

      const customerId = scheduleEvent.CustomerId;
      const customerUrl = `http://localhost:3000/customer/${customerId}`;

      try {
        const customerResponse = await fetch(customerUrl);
        if (!customerResponse.ok) {
          throw new Error(
            `Failed to fetch customer: ${customerResponse.statusText}`,
          );
        }
        const customer = await customerResponse.json();

        const stockDocumentId = scheduleEvent.StockDocumentId;
        const stockUrl = `http://localhost:3000/stock/${stockDocumentId}`;

        try {
          const stockResponse = await fetch(stockUrl);
          if (!stockResponse.ok) {
            throw new Error(
              `Failed to fetch stock document: ${stockResponse.statusText}`,
            );
          }

          const stockDocument = await stockResponse.json();

          return {
            ...scheduleEvent,
            customer: {
              id: customer.id,
              name: customer.name,
              cellPhone: customer.cellPhone,
              phone: customer.phone,
              firstName: customer.firstName,
              email: customer.email,
            },
            stockDocument: {
              id: stockDocument.id,
              name: stockDocument.name,
              // Ajouter d'autres champs du stock document ici
            },
          };
        } catch (error) {
          this.logger.error(
            `Error fetching stock document with ID: ${stockDocumentId}`,
            error.message,
          );
          throw error;
        }
      } catch (error) {
        this.logger.error(
          `Error fetching customer with ID: ${customerId}`,
          error.message,
        );
        throw error;
      }
    } catch (error) {
      this.logger.error(
        `Error finding schedule with ID: ${Id}, User: ${email}`,
        error.message,
      );
      throw error;
    }
  }
}

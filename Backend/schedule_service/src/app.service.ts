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

      // Récupération des données du client
      const customer = await this.fetchData(
        `http://api_gateway:3000/customers/${scheduleEvent.CustomerId}`,
        'customer',
      );

      // Vérifie si StockDocumentId est présent
      let stockDocument = null;
      if (scheduleEvent.StockDocumentId) {
        stockDocument = await this.fetchData(
          `http://api_gateway:3000/stock/${scheduleEvent.StockDocumentId}`,
          'stock document',
        );
      }

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
        stockDocument: stockDocument
          ? {
              Id: stockDocument.Id,
              Date: stockDocument.DocumentDate,
              Reference: stockDocument.Reference,
              NotesClear: stockDocument.NotesClear,
              DealId: stockDocument.DealId,
            }
          : null, // Si pas de document de stock, renvoyer null
      };
    } catch (error) {
      this.logger.error(
        `Error finding schedule with ID: ${Id}, User: ${email}`,
        error.message,
      );
      throw error;
    }
  }

  private async fetchData(url: string, dataType: string) {
    try {
      const response = await fetch(url, {
        headers: {
          'x-service-auth': 'trusted-service-key',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${dataType}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      this.logger.error(
        `Error fetching ${dataType} from ${url}`,
        error.message,
      );
      throw error;
    }
  }
}

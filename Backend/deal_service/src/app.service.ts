import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { CustomLogger } from './logging/custom-logger.service';
import { Pool } from 'pg';
import { Deal } from './entities/Deal.entity';

@Injectable()
export class DealService {
  private readonly logger = new CustomLogger('DealService');

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {
    this.logger.log('Initializing DealService...');

    this.initializeConnections();
  }

  async initializeConnections() {
    try {
      await this.pool.query('SELECT 1');
      this.logger.log('PostgreSQL connection established');
    } catch (err) {
      this.logger.error('Failed to connect to PostgreSQL', err);
    }

    try {
      await this.redisClient.ping();
      this.logger.log('Redis connection established');
    } catch (err) {
      this.logger.error('Failed to connect to Redis', err);
    }
  }

  async paginate(
    email: string,
    searchQuery: string,
    limit: number,
    offset: number,
  ) {
    const cacheKey = `deal_paginated_${email}_${searchQuery}_${limit}_${offset}`;

    try {
      const cachedData = await this.redisClient.get(cacheKey);
      if (cachedData) {
        this.logger.log('Cache hit');
        return JSON.parse(cachedData);
      } else {
        this.logger.log('Cache miss');

        let query = `
        SELECT 
          d.*, 
          COALESCE(di.items, '[]') AS items,
          COALESCE(dc.customer, '{}'::json) AS customer
        FROM "Deal" d
        LEFT JOIN (
          SELECT 
            "DealItem"."DealId", 
            json_agg("DealItem") AS items
          FROM "DealItem"
          GROUP BY "DealItem"."DealId"
        ) di ON d."Id" = di."DealId"
        LEFT JOIN (
          SELECT 
            "DealCustomer"."DealId", 
            json_build_object(
              'Id', "DealCustomer"."Id", 
              'Name', "DealCustomer"."Name"
            ) AS customer
          FROM "DealCustomer"
          GROUP BY "DealCustomer"."DealId", "DealCustomer"."Id", "DealCustomer"."Name"
        ) dc ON d."Id" = dc."DealId"
        `;

        let countQuery = `SELECT COUNT(*) FROM "Deal"`;
        const queryParams: (string | number)[] = [];
        const countParams: (string | number)[] = [];

        // Si searchQuery est fourni et non vide, ajoutez la condition WHERE
        if (searchQuery && searchQuery.trim() !== '') {
          query += ` WHERE d."Caption" ILIKE $1::text`;
          countQuery += ` WHERE d."Caption" ILIKE $1::text`;
          queryParams.push(`%${searchQuery}%`);
          countParams.push(`%${searchQuery}%`);
        }

        // Ajout des paramètres de pagination
        queryParams.push(limit);
        queryParams.push(offset);

        // Correction des index pour LIMIT et OFFSET
        if (searchQuery && searchQuery.trim() !== '') {
          query += `
            ORDER BY d."Caption" ASC 
            LIMIT $2 OFFSET $3
          `;
        } else {
          query += `
            ORDER BY d."Caption" ASC 
            LIMIT $1 OFFSET $2
          `;
        }

        const [dealResult, totalResult] = await Promise.all([
          this.pool.query(query, queryParams),
          this.pool.query(countQuery, countParams),
        ]);

        const totalDeal = parseInt(totalResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalDeal / limit);

        const response = {
          totalDeal,
          totalPages,
          deals: dealResult.rows,
        };

        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return response;
      }
    } catch (error) {
      this.logger.error('Error during pagination', error);
      throw new Error('Failed to paginate deals');
    }
  }

  async findOneById(id: string): Promise<Deal> {
    let query;
    const queryParams = [id];
    try {
      query = `
SELECT
    -- Agrégation des informations de Deal
    json_build_object(
        'Id', d."Id",
        'DealDate', d."DealDate",
        'xx_DateDebut', d."xx_DateDebut",
        'xx_DateFin', d."xx_DateFin",
        'xx_client', d."xx_Client",
        'Caption', d."Caption",
        'NotesClear', d."NotesClear",
        'ActualTreasury', d."ActualTreasury",
        'CustomerCommitmentBalanceDues', d."CustomerCommitmentBalanceDues"
    ) AS "Deal",
    
    -- Agrégation des informations des clients (DealCustomer)
    json_build_object(
        'Id', dc."Id",
        'ThirdId', dc."ThirdId",
        'Name', dc."Name"
    ) AS "DealCustomer",
    
    -- Agrégation des items du deal (DealItem)
    json_agg(
        json_build_object(
            'Id', di."Id",
            'ItemId', di."ItemId",
            'DealId', di."DealId",
            'ItemCaption', di."ItemCaption",
            'AmountVatExcluded', di."AmountVatExcluded"
        )
    ) AS "DealItems",
    
    -- Agrégation des documents d'achat (DealPurchaseDocument)
    json_agg(
        json_build_object(
            'Id', pd."Id",
            'DocumentId', pd."DocumentId",
            'DocumentDate', pd."DocumentDate",
            'GlobalDocumentState', pd."GlobalDocumentState"
        )
    ) AS "DealPurchaseDocuments",
    
    -- Agrégation des lignes des documents d'achat (DealPurchaseDocumentLine)
    json_agg(
        json_build_object(
            'Quantity', pdl."Quantity",
            'DocumentId', pdl."DocumentId",
            'DescriptionClear', pdl."DescriptionClear"
        )
    ) AS "DealPurchaseDocumentLines"
    
FROM "Deal" d
-- Jointure avec les informations des clients (DealCustomer)
LEFT JOIN "DealCustomer" dc ON d."Id" = dc."DealId"
-- Jointure avec les items du deal (DealItem)
LEFT JOIN "DealItem" di ON d."Id" = di."DealId"
-- Jointure avec les documents d'achat (DealPurchaseDocument)
LEFT JOIN "DealPurchaseDocument" pd ON d."Id" = pd."DealId"
-- Jointure avec les lignes des documents d'achat (DealPurchaseDocumentLine)
LEFT JOIN "DealPurchaseDocumentLine" pdl ON pd."DocumentId" = pdl."DocumentId"
WHERE d."Id" = $1
GROUP BY d."Id", d."DealDate", d."xx_DateDebut", d."xx_DateFin", d."xx_Client", d."Caption", d."NotesClear", d."ActualTreasury", d."CustomerCommitmentBalanceDues", dc."ThirdId", dc."Name", dc."Id", di."Id", di."ItemId", di."DealId", di."ItemCaption", di."AmountVatExcluded", pd."Id", pd."DocumentId", pd."DocumentDate", pd."GlobalDocumentState", pdl."Quantity", pdl."DocumentId", pdl."DescriptionClear";

      `;

      const result = await this.pool.query(query, queryParams);
      if (result.rows.length === 0) {
        throw new Error('Deal not found');
      } else {
        return result.rows[0];
      }
    } catch (error) {
      this.logger.error('Error during findOne', error);
      throw new Error('Failed to find deal');
    }
  }
}

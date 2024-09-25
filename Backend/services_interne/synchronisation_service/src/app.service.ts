import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { ConnectionPool } from 'mssql';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG_CONNECTION') private readonly pgPool: Pool,
    @Inject('MSSQL_CONNECTION') private readonly mssqlPool: ConnectionPool,
    @Inject('BARRACHIN_CONNECTION')
    private readonly barrachinPool: ConnectionPool,
  ) {}

  async getCustomerCounts(): Promise<{ mssqlCount: number; pgCount: number }> {
    // PostgreSQL query
    const pgQuery = 'SELECT COUNT(*) FROM "Customer"';
    const pgResult = await this.pgPool.query(pgQuery);
    const pgCount = parseInt(pgResult.rows[0].count, 10);

    // MSSQL query
    const mssqlQuery = 'SELECT COUNT(*) AS count FROM Customer';
    const mssqlRequest = this.mssqlPool.request();
    const mssqlResult = await mssqlRequest.query(mssqlQuery);
    const mssqlCount = mssqlResult.recordset[0].count;

    return { mssqlCount, pgCount };
  }

  async getItemsCounts(): Promise<{ mssqlCount: number; pgCount: number }> {
    // PostgreSQL query
    const pgQuery = 'SELECT COUNT(*) FROM "Item"';
    const pgResult = await this.pgPool.query(pgQuery);
    const pgCount = parseInt(pgResult.rows[0].count, 10);

    // MSSQL query
    const mssqlQuery = 'SELECT COUNT(*) AS count FROM Item';
    const mssqlRequest = this.mssqlPool.request();
    const mssqlResult = await mssqlRequest.query(mssqlQuery);
    const mssqlCount = mssqlResult.recordset[0].count;

    return { mssqlCount, pgCount };
  }

  async syncCustomersEbpToPg(): Promise<{
    insertedCustomers: { id: any; name: any }[];
    skippedCustomers: string[];
  }> {
    // Étape 1 : Récupérer tous les clients existants dans PostgreSQL
    const pgExistingQuery = 'SELECT "Id" FROM "Customer"'; // Utiliser la casse correcte (avec guillemets) pour la colonne "Id" dans PostgreSQL
    const pgExistingResult = await this.pgPool.query(pgExistingQuery);

    // Extraire les IDs existants dans PostgreSQL
    const pgExistingIds = pgExistingResult.rows.map((row) => row.Id); // "Id" est sensible à la casse ici

    // Étape 2 : Récupérer tous les clients et colonnes depuis MSSQL
    const mssqlQuery = 'SELECT * FROM Customer'; // Récupérer toutes les colonnes de la table MSSQL
    const mssqlRequest = this.mssqlPool.request();
    const mssqlResult = await mssqlRequest.query(mssqlQuery);

    // Filtrer les clients MSSQL qui n'existent pas dans PostgreSQL
    const customersToInsert = mssqlResult.recordset.filter(
      (row) => !pgExistingIds.includes(row.Id), // Assurez-vous que l'identifiant MSSQL correspond à celui de PostgreSQL
    );

    // Si aucun client ne doit être inséré, retourner une réponse vide
    if (customersToInsert.length === 0) {
      return { insertedCustomers: [], skippedCustomers: [] };
    }

    // Étape 3 : Construire dynamiquement la requête d'insertion
    const columns = Object.keys(customersToInsert[0]);
    const columnNames = columns.map((col) => `"${col}"`).join(', '); // Utiliser les guillemets pour toutes les colonnes
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    const pgQuery = `INSERT INTO "Customer" (${columnNames}) VALUES (${placeholders})`;

    // Tableau pour stocker les clients insérés avec leur id et name
    const insertedCustomers: { id: any; name: any }[] = [];
    const skippedCustomers: string[] = [];

    // Étape 4 : Insérer chaque client manquant dans PostgreSQL avec gestion des erreurs
    for (const row of customersToInsert) {
      try {
        const values = columns.map((col) => row[col]);
        await this.pgPool.query(pgQuery, values);

        // Ajouter le client inséré avec son id et name
        insertedCustomers.push({ id: row.Id, name: row.Name }); // Respectez la casse des colonnes MSSQL
      } catch (error) {
        // Vérifiez si l'erreur est liée à une colonne manquante et ignorez cet enregistrement
        if (error.message.includes('does not exist')) {
          console.warn(
            `Skipping insertion due to missing column: ${error.message}`,
          );
          skippedCustomers.push(`Customer ID: ${row.Id}, Name: ${row.Name}`);
        } else {
          console.error('Unexpected error during insertion:', error);
          throw error; // Si ce n'est pas une erreur de colonne manquante, on relance l'erreur
        }
      }
    }

    // Retourner les clients insérés et ceux ignorés
    return { insertedCustomers, skippedCustomers };
  }

  async syncItemsEbpToPg(): Promise<{
    insertedItems: { id: any; name: any }[];
    skippedItems: string[];
  }> {
    // Étape 1 : Récupérer tous les items existants dans PostgreSQL
    const pgExistingQuery = 'SELECT "Id" FROM "Item"';
    const pgExistingResult = await this.pgPool.query(pgExistingQuery);

    // Extraire les IDs existants dans PostgreSQL
    const pgExistingIds = pgExistingResult.rows.map((row) => row.Id);

    // Étape 2 : Récupérer tous les items et colonnes depuis MSSQL
    const mssqlQuery = 'SELECT * FROM Item';
    const mssqlRequest = this.mssqlPool.request();
    const mssqlResult = await mssqlRequest.query(mssqlQuery);

    // Filtrer les items MSSQL qui n'existent pas dans PostgreSQL
    const itemsToInsert = mssqlResult.recordset.filter(
      (row) => !pgExistingIds.includes(row.Id),
    );

    // Si aucun item ne doit être inséré, retourner une réponse vide
    if (itemsToInsert.length === 0) {
      return { insertedItems: [], skippedItems: [] };
    }

    // Étape 3 : Construire dynamiquement la requête d'insertion
    const columns = Object.keys(itemsToInsert[0]);
    const columnNames = columns.map((col) => `"${col}"`).join(', ');
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    const pgQuery = `INSERT INTO "Item" (${columnNames}) VALUES (${placeholders})`;

    // Tableau pour stocker les items insérés avec leur id et name
    const insertedItems: { id: any; name: any; caption: any }[] = [];
    const skippedItems: string[] = [];

    // Étape 4 : Insérer chaque item manquant dans PostgreSQL avec gestion des erreurs
    for (const row of itemsToInsert) {
      try {
        const values = columns.map((col) => row[col]);
        await this.pgPool.query(pgQuery, values);

        // Ajouter l'item inséré avec son id et name
        insertedItems.push({
          id: row.Id,
          name: row.Name,
          caption: row.Caption,
        });
      } catch (error) {
        // Vérifiez si l'erreur est liée à une colonne manquante et ignorez cet enregistrement
        if (error.message.includes('does not exist')) {
          console.warn(
            `Skipping insertion due to missing column: ${error.message}`,
          );
          skippedItems.push(`Item ID: ${row.Id}, Name: ${row.Name}`);
        } else {
          console.error('Unexpected error during insertion:', error);
          throw error;
        }
      }
    }

    // Retourner les items insérés et ceux ignorés
    return { insertedItems, skippedItems };
  }

  async getInfoFromBarrachin(): Promise<{ info?: any[]; error?: string }> {
    try {
      const query = 'SELECT TOP 10 * FROM "ConstructionSite"';
      const request = this.barrachinPool.request();
      const result = await request.query(query);

      if (result.recordset.length === 0) {
        throw new Error('No records found in ConstructionSite');
      }

      const info = result.recordset; // Ici, info est un tableau d'objets

      return { info };
    } catch (error) {
      return { error: error.message };
    }
  }
}

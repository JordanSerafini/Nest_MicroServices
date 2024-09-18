import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { ConnectionPool } from 'mssql';

interface TableInfo {
  tableName: string;
  columns: { name: string; type: string }[];
}

@Injectable()
export class AppService {
  constructor(
    @Inject('PG_CONNECTION') private readonly pgPool: Pool,
    @Inject('MSSQL_CONNECTION') private readonly mssqlPool: ConnectionPool,
    @Inject('BARRACHIN_CONNECTION')
    private readonly barrachinPool: ConnectionPool,
  ) {}

  async getTables(): Promise<TableInfo[]> {
    const query = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
    `;
    const result = await this.mssqlPool.query(query);
    const tables: TableInfo[] = [];

    for (const record of result.recordset) {
      const tableName: string = record.TABLE_NAME;
      const columnsQuery = `
        SELECT COLUMN_NAME, DATA_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${tableName}'
      `;
      const columnsResult = await this.mssqlPool.query(columnsQuery);
      const columns = columnsResult.recordset.map((column) => ({
        name: column.COLUMN_NAME,
        type: column.DATA_TYPE,
      }));
      tables.push({ tableName, columns });
    }
    return tables;
  }

  generateCreateTableScript(tableInfo: TableInfo): string {
    let script = `CREATE TABLE IF NOT EXISTS "${tableInfo.tableName}" (\n`;

    tableInfo.columns.forEach((column, index) => {
      let pgDataType: string;
      switch (column.type) {
        case 'nvarchar':
        case 'varchar':
        case 'nchar':
          pgDataType = 'TEXT';
          break;
        case 'int':
          pgDataType = 'INTEGER';
          break;
        case 'varbinary':
          pgDataType = 'BYTEA';
          break;
        case 'uniqueidentifier':
          pgDataType = 'UUID';
          break;
        case 'decimal':
          pgDataType = 'DECIMAL';
          break;
        case 'tinyint':
        case 'smallint':
          pgDataType = 'SMALLINT';
          break;
        case 'datetime':
          pgDataType = 'TIMESTAMP';
          break;
        case 'bit':
          pgDataType = 'BOOLEAN';
          break;
        case 'float':
          pgDataType = 'REAL';
          break;
        default:
          pgDataType = 'TEXT';
          throw new Error(`Type de données non géré : ${column.type}`);
      }
      script += `    "${column.name}" ${pgDataType}`;
      if (index < tableInfo.columns.length - 1) {
        script += ',';
      }
      script += '\n';
    });
    script += ');';
    return script;
  }

  async createTables(): Promise<void> {
    const tables = await this.getTables();
    for (const tableInfo of tables) {
      const createTableScript = this.generateCreateTableScript(tableInfo);
      await this.pgPool.query(createTableScript);
      console.log(`Table ${tableInfo.tableName} créée avec succès.`);
    }
    console.log('Toutes les tables ont été créées avec succès.');
  }

  formatValue(value: any, dataType: string): string {
    if (value === null || value === undefined) {
      return 'NULL';
    }

    // Vérifiez si la valeur est de type Buffer pour varbinary
    if (dataType === 'varbinary' && Buffer.isBuffer(value)) {
      return `decode('${value.toString('hex')}', 'hex')`;
    }

    if (typeof value === 'string') {
      value = value.replace(/'/g, "''");
    }

    switch (dataType) {
      case 'nvarchar':
      case 'varchar':
      case 'nchar':
        return `'${value}'`;
      case 'uniqueidentifier':
        return `'${value}'`;
      case 'datetime':
        return `'${value.toISOString()}'`;
      case 'int':
      case 'decimal':
      case 'tinyint':
      case 'smallint':
      case 'float':
        return `${value}`;
      case 'bit':
        return value ? 'true' : 'false';
      default:
        throw new Error(`Type de données non géré : ${dataType}`);
    }
  }

  generateInsertQuery(tableInfo: TableInfo, rowData: any): string {
    const columnNames = Object.keys(rowData)
      .map((col) => `"${col}"`)
      .join(', ');
    const values = Object.values(rowData)
      .map((value, index) => {
        const dataType = tableInfo.columns[index].type;
        return this.formatValue(value, dataType);
      })
      .join(', ');

    return `INSERT INTO "${tableInfo.tableName}" (${columnNames}) VALUES (${values});`;
  }

  async insertDataFromMSSQLToPGSQL(): Promise<void> {
    const tables = await this.getTables();
    for (const tableInfo of tables) {
      if (
        [
          'EventLog',
          'EbpSysAsynchronousLog',
          'EbpSysReport',
          'EbpSysDeletedRecord',
        ].includes(tableInfo.tableName)
      ) {
        console.log(
          `Insertion dans la table '${tableInfo.tableName}' ignorée.`,
        );
        continue;
      }

      console.log(
        `Démarrage de l'insertion dans la table: ${tableInfo.tableName}`,
      );
      const selectQuery = `SELECT * FROM ${tableInfo.tableName}`;
      let result;

      try {
        result = await this.mssqlPool.query(selectQuery);
      } catch (err) {
        console.error(
          `Erreur lors de la requête de données de la table ${tableInfo.tableName}:`,
          err,
        );
        continue;
      }

      const insertQueries = result.recordset.map((rowData) =>
        this.generateInsertQuery(tableInfo, rowData),
      );

      let countInserted = 0; // Compteur pour le nombre d'insertion

      for (const insertQuery of insertQueries) {
        try {
          await this.pgPool.query(insertQuery);
          countInserted++; // Incrémente le compteur à chaque insertion réussie
        } catch (error) {
          console.error(
            `Erreur pendant l'insertion dans la table "${tableInfo.tableName}":`,
            error,
          );
          console.log(`Requête incorrecte: ${insertQuery}`);
        }
      }

      // Affiche le nombre de données insérées
      console.log(
        `Données insérées dans la table: "${tableInfo.tableName}". Nombre d'insertion: ${countInserted}.`,
      );
    }
  }

  async extractAllTables(): Promise<string[]> {
    try {
      const query = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
      `;
      const result = await this.pgPool.query(query);
      const tables = result.rows.map((row) => row.table_name);
      return tables;
    } catch (error) {
      console.error("Erreur lors de l'extraction des tables :", error);
      throw error;
    }
  }

  async insertDataFromMSSQLToPGSQLSelect(): Promise<void> {
    try {
      const startTime = Date.now();
      const tables = await this.getTables();
      const allowedTables = [
        'Incident',
        'IncidentAssociatedFiles',
        'IncidentCustomerProduct',
        'IncidentTemplate',
        'IncidentTemplateExtraCost',
        'Item',
        'StockDocument',
        'StockDocumentLine',
        'Address',
        'DealStockDocumentLine',
      ];
      //const allowedTables = ["Customer", "Item", "StockDocument", "StockDocumentLine", "Address", "Supplier","SupplierItem", "SaleDocumentLine", "Storehouse", "ScheduleEvent", , "ScheduleEventType","MaintenanceContract", "MaintenanceContractAssociatedFiles", "MaintenanceContractFamily", "MaintenanceContractPurchaseDocument" ];

      console.log("Début du processus d'insertion des données...");

      for (const tableInfo of tables) {
        if (!allowedTables.includes(tableInfo.tableName)) {
          continue;
        }

        console.log(
          `Démarrage de l'insertion dans la table: ${tableInfo.tableName}`,
        );
        const selectQuery = `SELECT * FROM ${tableInfo.tableName}`;
        let result;

        try {
          result = await this.barrachinPool.query(selectQuery);
          console.log(
            `Récupération de données pour la table: ${tableInfo.tableName}`,
            result.recordset,
          );
        } catch (err) {
          console.error(
            `Erreur lors de la requête de données de la table ${tableInfo.tableName}:`,
            err,
          );
          continue;
        }

        const numRows = result.recordset.length;
        let successfulInserts = 0;

        const insertQueries = result.recordset.map((rowData) =>
          this.generateInsertQuery(tableInfo, rowData),
        );

        for (const insertQuery of insertQueries) {
          try {
            console.log(`Exécution de la requête d'insertion: ${insertQuery}`);
            await this.pgPool.query(insertQuery);
            successfulInserts++;
          } catch (error) {
            console.error(
              `Erreur pendant l'insertion dans la table "${tableInfo.tableName}":`,
              error,
            );
            console.log(`Requête incorrecte: ${insertQuery}`);
          }
        }

        console.log(
          `Table: "${tableInfo.tableName}", Insertions réussies : ${successfulInserts} sur ${numRows}`,
        );
      }

      const endTime = Date.now();
      const executionTime = endTime - startTime;
      console.log(`Temps d'exécution total : ${executionTime} ms`);
      console.log("Processus d'insertion des données terminé.");
    } catch (error) {
      console.error("Erreur globale dans le processus d'insertion :", error);
    }
  }

  async getTableStructure(tableName: string): Promise<any> {
    try {
      const query = `
        SELECT COLUMN_NAME, DATA_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${tableName}'
      `;
      const result = await this.mssqlPool.query(query);

      const columns = result.recordset.map((column) => ({
        name: column.COLUMN_NAME,
        type: column.DATA_TYPE,
      }));

      return { tableName, columns };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la structure de la table '${tableName}':`,
        error,
      );
      throw new Error(
        `Impossible de récupérer la structure de la table '${tableName}'.`,
      );
    }
  }

  //! ------------------ DEL ------------------ !//
  async dropAllTables(): Promise<void> {
    try {
      const tables = await this.extractAllTables();
      const excludedTables = ['Homecards', 'utilisateurs'];
      for (const table of tables) {
        if (!excludedTables.includes(table)) {
          const query = `DROP TABLE IF EXISTS "${table}" CASCADE;`;
          await this.pgPool.query(query);
          console.log(`Table ${table} supprimée avec succès.`);
        } else {
          console.log(`Suppression de la table ${table} omise.`);
        }
      }
      console.log(
        "Processus de suppression des tables terminé, à l'exception des tables spécifiées.",
      );
    } catch (error) {
      console.error('Erreur lors de la suppression des tables :', error);
      throw error;
    }
  }

  async truncateAllTables(): Promise<void> {
    try {
      const tables = await this.extractAllTables();
      const excludedTables = ['utilisateurs', 'Homecards'];
      for (const table of tables) {
        if (!excludedTables.includes(table)) {
          const checkExistenceQuery = `SELECT EXISTS (
            SELECT FROM pg_catalog.pg_tables
            WHERE tablename  = '${table}'
          );`;
          const existence = await this.pgPool.query(checkExistenceQuery);
          if (existence.rows[0].exists) {
            const query = `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`;
            await this.pgPool.query(query);
            console.log(`Table ${table} vidée avec succès.`);
          } else {
            console.log(`Table ${table} n'existe pas, vidage non effectué.`);
          }
        } else {
          console.log(`Vidage de la table ${table} annulé (table exclue).`);
        }
      }
      console.log('Processus de vidage des tables terminé.');
    } catch (error) {
      console.error('Erreur lors du vidage des tables :', error);
      throw error;
    }
  }

  async dropTableByName(tableName: string): Promise<string> {
    if (!tableName) {
      throw new Error('Le nom de la table est requis.');
    }

    try {
      const query = `DROP TABLE IF EXISTS "${tableName}" CASCADE;`;
      await this.pgPool.query(query);
      return `La table ${tableName} a été supprimée avec succès.`;
    } catch (error) {
      console.error('Erreur lors de la suppression de la table :', error);
      throw new Error(
        "Une erreur s'est produite lors de la suppression de la table.",
      );
    }
  }

  async truncateByTableName(tableName: string): Promise<string> {
    if (!tableName) {
      throw new Error('Le nom de la table est requis.');
    }

    try {
      const checkExistenceQuery = `SELECT EXISTS (
        SELECT FROM pg_catalog.pg_tables
        WHERE tablename  = '${tableName}'
      );`;
      const existence = await this.pgPool.query(checkExistenceQuery);
      if (existence.rows[0].exists) {
        const query = `TRUNCATE TABLE "${tableName}" RESTART IDENTITY;`;
        await this.pgPool.query(query);
        return `La table ${tableName} a été vidée avec succès.`;
      } else {
        throw new Error(`La table ${tableName} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors du vidage de la table :', error);
      throw new Error("Une erreur s'est produite lors du vidage de la table.");
    }
  }
}

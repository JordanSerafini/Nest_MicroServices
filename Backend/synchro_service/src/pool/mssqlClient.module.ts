// poolMSSQL.module.ts
import { Module, Global } from '@nestjs/common';
import sql from 'mssql';

const config: sql.config = {
  server: 'SRVEBP-2022\\SRVEBP',
  database: 'Solution Logique_0895452f-b7c1-4c00-a316-c6a6d0ea4bf4',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: '@ebp78EBP',
    },
  },
  options: {
    trustServerCertificate: true,
    encrypt: true,
  },
};

@Global()
@Module({})
export class PoolMSSQLModule {
  private static pool: sql.ConnectionPool;

  static async connect(): Promise<sql.ConnectionPool> {
    if (!this.pool) {
      try {
        this.pool = await sql.connect(config);
        console.log('Connexion à la base de données MSSQL établie !');
      } catch (error) {
        console.error(
          'Erreur lors de la connexion à la base de données MSSQL :',
          error,
        );
        throw error;
      }
    }
    return this.pool;
  }

  static async query(
    query: string,
    params?: { [name: string]: any },
  ): Promise<sql.IResult<any>> {
    const pool = await this.connect();
    const request = pool.request();

    if (params) {
      Object.keys(params).forEach((key) => {
        request.input(key, params[key]);
      });
    }

    try {
      const result: sql.IResult<any> = await request.query(query);
      return result;
    } catch (error) {
      console.error("Erreur lors de l'exécution de la requête MSSQL :", error);
      throw error;
    }
  }
}

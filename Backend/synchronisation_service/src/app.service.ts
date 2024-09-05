import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { ConnectionPool } from 'mssql';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG_CONNECTION') private readonly pgPool: Pool,
    @Inject('MSSQL_CONNECTION') private readonly mssqlPool: ConnectionPool,
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
}

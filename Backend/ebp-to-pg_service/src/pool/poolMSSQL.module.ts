import { Module, Global } from '@nestjs/common';
import * as sql from 'mssql';

const config: sql.config = {
  server: 'SRVEBP-2022\\SRVEBP', //'192.168.20.12\\SRVEBP',
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
@Module({
  providers: [
    {
      provide: 'MSSQL_CONNECTION',
      useFactory: async () => {
        try {
          console.log('Attempting to connect to MSSQL database...');
          const pool = await sql.connect(config);
          console.log('MSSQL database connected successfully.');
          return pool;
        } catch (error) {
          console.error('Failed to connect to MSSQL database:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['MSSQL_CONNECTION'],
})
export class PoolMSSQLModule {}

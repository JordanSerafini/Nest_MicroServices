import { Module, Global, OnModuleDestroy, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async () => {
        const pool = new Pool({
          host: 'host.docker.internal',
          port: 5432,
          user: 'jordans',
          password: 'slitest',
          database: 'SLI',
        });

        try {
          await pool.connect();
          console.log('Connected to the PostgreSQL database successfully.');
          return pool;
        } catch (error) {
          console.error('Failed to connect to the PostgreSQL database:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class PoolEBPModule implements OnModuleDestroy {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end();
    console.log('PostgreSQL database connection pool has been closed.');
  }
}

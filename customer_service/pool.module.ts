import { Module, Global, OnModuleDestroy, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async () => {
        const pool = new Pool({
          host: 'localhost',
          port: 5432,
          user: 'jordans',
          password: 'slitest',
          database: 'SLI',
        });

        try {
          await pool.connect();
          console.log('Connected to the database successfully.');
        } catch (error) {
          console.error('Failed to connect to the database:', error);
          throw error;
        }

        return pool;
      },
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class PoolModule implements OnModuleDestroy {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Database connection pool has been closed.');
  }
}

import { Module, Global, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { retry } from 'rxjs';
import { from } from 'rxjs';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get<string>('PG_HOST'),
          port: configService.get<number>('PG_PORT'),
          user: configService.get<string>('PG_USER'),
          password: configService.get<string>('PG_PASSWORD'),
          database: configService.get<string>('PG_DATABASE'),
          max: 50,
          connectionTimeoutMillis: 2000,
        });
        

        return from(pool.connect()).pipe(
          retry(5)
        ).toPromise().then(() => {
          console.log('Connected to the PostgreSQL database successfully.');
          return pool;
        }).catch((error) => {
          console.error('Failed to connect to the PostgreSQL database:', error);
          throw error;
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class PgConnectionModule implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor(@Inject('PG_CONNECTION') pool: Pool) {
    this.pool = pool;
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('PostgreSQL connection pool has been closed.');
  }
}

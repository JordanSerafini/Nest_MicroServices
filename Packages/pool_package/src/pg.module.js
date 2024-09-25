"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let PgConnectionModule = class PgConnectionModule {
    constructor(pool) {
        this.pool = pool;
    }
    async onModuleDestroy() {
        await this.pool.end();
        console.log('PostgreSQL connection pool has been closed.');
    }
};
exports.PgConnectionModule = PgConnectionModule;
exports.PgConnectionModule = PgConnectionModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'PG_CONNECTION',
                useFactory: async (configService) => {
                    const pool = new pg_1.Pool({
                        host: configService.get('PG_HOST'),
                        port: configService.get('PG_PORT'),
                        user: configService.get('PG_USER'),
                        password: configService.get('PG_PASSWORD'),
                        database: configService.get('PG_DATABASE'),
                    });
                    try {
                        await pool.connect();
                        console.log('Connected to the PostgreSQL database successfully.');
                        return pool;
                    }
                    catch (error) {
                        console.error('Failed to connect to the PostgreSQL database:', error);
                        throw error;
                    }
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: ['PG_CONNECTION'],
    }),
    __metadata("design:paramtypes", [pg_1.Pool])
], PgConnectionModule);

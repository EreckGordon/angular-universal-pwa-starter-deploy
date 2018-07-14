"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
// if needed add other connections with different name then add it to the exported array below.
// and make sure that entities have their respective connection name otherwise it is going to be using the default connection below.
const defaultDB = {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'testingpass',
    database: process.env.POSTGRES_DATABASE || 'testingDB',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
    cache: true,
};
exports.databaseProviders = [typeorm_1.TypeOrmModule.forRoot(defaultDB)];

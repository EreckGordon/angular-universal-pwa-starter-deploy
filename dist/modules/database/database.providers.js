"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await typeorm_1.createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'testingpass',
            database: 'testingDB',
            entities: [
                __dirname + '/../**/**.entity{.ts,.js}',
            ],
            synchronize: true,
            logging: false
        }),
    },
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
const email_and_password_provider_entity_1 = require("./email-and-password-provider.entity");
exports.authProviders = [
    {
        provide: 'UserRepositoryToken',
        useFactory: (connection) => connection.getRepository(user_entity_1.User),
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'EmailAndPasswordProviderRepositoryToken',
        useFactory: (connection) => connection.getRepository(email_and_password_provider_entity_1.EmailAndPasswordProvider),
        inject: ['DbConnectionToken'],
    },
];

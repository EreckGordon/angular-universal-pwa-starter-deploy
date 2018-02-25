"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
const email_and_password_provider_entity_1 = require("./email-and-password/email-and-password-provider.entity");
const google_provider_entity_1 = require("./google/google-provider.entity");
const facebook_provider_entity_1 = require("./facebook/facebook-provider.entity");
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
    {
        provide: 'GoogleProviderRepositoryToken',
        useFactory: (connection) => connection.getRepository(google_provider_entity_1.GoogleProvider),
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'FacebookProviderRepositoryToken',
        useFactory: (connection) => connection.getRepository(facebook_provider_entity_1.FacebookProvider),
        inject: ['DbConnectionToken'],
    },
];

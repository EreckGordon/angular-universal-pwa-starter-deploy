"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_entity_1 = require("./user.entity");
var email_and_password_provider_entity_1 = require("./email-and-password/email-and-password-provider.entity");
var google_provider_entity_1 = require("./google/google-provider.entity");
var facebook_provider_entity_1 = require("./facebook/facebook-provider.entity");
exports.authProviders = [
    {
        provide: 'UserRepositoryToken',
        useFactory: function (connection) { return connection.getRepository(user_entity_1.User); },
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'EmailAndPasswordProviderRepositoryToken',
        useFactory: function (connection) { return connection.getRepository(email_and_password_provider_entity_1.EmailAndPasswordProvider); },
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'GoogleProviderRepositoryToken',
        useFactory: function (connection) { return connection.getRepository(google_provider_entity_1.GoogleProvider); },
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'FacebookProviderRepositoryToken',
        useFactory: function (connection) { return connection.getRepository(facebook_provider_entity_1.FacebookProvider); },
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=auth.providers.js.map
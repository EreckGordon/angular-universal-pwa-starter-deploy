"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_entity_1 = require("./user.entity");
var email_and_password_provider_entity_1 = require("./email-and-password/email-and-password-provider.entity");
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
];
//# sourceMappingURL=auth.providers.js.map
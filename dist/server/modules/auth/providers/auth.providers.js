"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user.entity");
const email_and_password_provider_entity_1 = require("./email-and-password/email-and-password-provider.entity");
const google_provider_entity_1 = require("./google/google-provider.entity");
const facebook_provider_entity_1 = require("./facebook/facebook-provider.entity");
exports.authProviders = [
    typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
    typeorm_1.TypeOrmModule.forFeature([email_and_password_provider_entity_1.EmailAndPasswordProvider]),
    typeorm_1.TypeOrmModule.forFeature([google_provider_entity_1.GoogleProvider]),
    typeorm_1.TypeOrmModule.forFeature([facebook_provider_entity_1.FacebookProvider]),
];

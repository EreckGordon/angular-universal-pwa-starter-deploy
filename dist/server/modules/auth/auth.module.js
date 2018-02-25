"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const auth_controller_1 = require("./auth.controller");
const auth_providers_1 = require("./auth.providers");
const auth_service_1 = require("./auth.service");
const email_and_password_service_1 = require("./email-and-password/email-and-password.service");
const google_service_1 = require("./google/google.service");
const facebook_service_1 = require("./facebook/facebook.service");
const anonymous_service_1 = require("./anonymous/anonymous.service");
const common_module_1 = require("../common/common.module");
const middlewares_1 = require("../common/middlewares");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply([middlewares_1.RetrieveUserIdFromRequestMiddleware]).forRoutes(auth_controller_1.AuthController);
        consumer
            .apply([middlewares_1.checkIfAuthenticatedMiddleware, middlewares_1.checkCSRFTokenMiddleware])
            .forRoutes({ path: '/logout', method: common_1.RequestMethod.ALL });
    }
};
AuthModule = __decorate([
    common_1.Module({
        modules: [common_module_1.CommonModule, database_module_1.DatabaseModule],
        components: [...auth_providers_1.authProviders, auth_service_1.AuthService, email_and_password_service_1.EmailAndPasswordService, anonymous_service_1.AnonymousService, google_service_1.GoogleService, facebook_service_1.FacebookService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;

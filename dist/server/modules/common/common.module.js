"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const security_service_1 = require("./security/security.service");
const mailgun_service_1 = require("./mailgun.service");
const common_providers_1 = require("./common.providers");
const database_module_1 = require("../database/database.module");
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule, ...common_providers_1.commonProviders],
        providers: [security_service_1.SecurityService, mailgun_service_1.MailgunService],
        exports: [security_service_1.SecurityService, mailgun_service_1.MailgunService],
    })
], CommonModule);
exports.CommonModule = CommonModule;

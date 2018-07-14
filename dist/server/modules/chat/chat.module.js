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
const auth_providers_1 = require("../auth/providers/auth.providers");
const chat_providers_1 = require("./providers/chat.providers");
const chat_service_1 = require("./chat.service");
const chat_gateway_1 = require("./gateways/chat.gateway");
const chat_cache_1 = require("./chat.cache");
const common_module_1 = require("../common/common.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [common_module_1.CommonModule, database_module_1.DatabaseModule, ...chat_providers_1.chatProviders, ...auth_providers_1.authProviders],
        providers: [chat_service_1.ChatService, chat_gateway_1.ChatGateway, chat_cache_1.ChatCache],
    })
], ChatModule);
exports.ChatModule = ChatModule;

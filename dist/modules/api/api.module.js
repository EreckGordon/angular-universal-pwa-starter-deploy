"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const article_module_1 = require("../article/article.module");
const api_service_1 = require("./api.service");
const api_controller_1 = require("./api.controller");
const middlewares_1 = require("../common/middlewares");
let APIModule = class APIModule {
    configure(consumer) {
        consumer.apply([middlewares_1.RetrieveUserIdFromRequestMiddleware]).forRoutes(api_controller_1.APIController);
        consumer.apply([middlewares_1.checkIfAuthenticatedMiddleware, middlewares_1.checkCSRFTokenMiddleware]).forRoutes({ path: '/logout', method: common_1.RequestMethod.ALL });
    }
};
APIModule = __decorate([
    common_1.Module({
        modules: [auth_module_1.AuthModule, article_module_1.ArticleModule],
        components: [api_service_1.APIService],
        controllers: [api_controller_1.APIController]
    })
], APIModule);
exports.APIModule = APIModule;

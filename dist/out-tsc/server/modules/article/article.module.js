"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var database_module_1 = require("../database/database.module");
var article_providers_1 = require("./article.providers");
var article_service_1 = require("./article.service");
var ArticleModule = /** @class */ (function () {
    function ArticleModule() {
    }
    ArticleModule = __decorate([
        common_1.Module({
            modules: [database_module_1.DatabaseModule],
            components: article_providers_1.articleProviders.concat([
                article_service_1.ArticleService
            ]),
            exports: [article_service_1.ArticleService]
        })
    ], ArticleModule);
    return ArticleModule;
}());
exports.ArticleModule = ArticleModule;
//# sourceMappingURL=article.module.js.map
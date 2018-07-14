"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("./article.entity");
exports.articleProviders = [typeorm_1.TypeOrmModule.forFeature([article_entity_1.Article])];

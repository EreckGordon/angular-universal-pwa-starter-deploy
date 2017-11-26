"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_entity_1 = require("./article.entity");
exports.articleProviders = [
    {
        provide: 'ArticleRepositoryToken',
        useFactory: (connection) => connection.getRepository(article_entity_1.Article),
        inject: ['DbConnectionToken'],
    },
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var article_entity_1 = require("./article.entity");
exports.articleProviders = [
    {
        provide: 'ArticleRepositoryToken',
        useFactory: function (connection) { return connection.getRepository(article_entity_1.Article); },
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=article.providers.js.map
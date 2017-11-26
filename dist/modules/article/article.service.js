"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
let ArticleService = class ArticleService {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async findAllArticles() {
        return await this.articleRepository.find();
    }
    async findArticleById(id) {
        return await this.articleRepository.findOne(id);
    }
    async createArticle(title, slug, content) {
        const article = new article_entity_1.Article();
        article.title = title;
        article.slug = slug;
        article.content = content;
        return await this.articleRepository.save(article);
    }
};
ArticleService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('ArticleRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ArticleService);
exports.ArticleService = ArticleService;

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var blog_service_1 = require("./blog.service");
var seo_service_1 = require("../../shared/seo.service");
var BlogComponent = /** @class */ (function () {
    function BlogComponent(seoService, blogService) {
        this.seoService = seoService;
        this.destroy = new Subject_1.Subject();
        this.keywords = 'angular, universal, angular-cli, PWA, expressjs';
        this.description = 'Blog page. It is a repository of articles.';
        this.seoService.setPageTitle('ngiso - blog');
        this.seoService.setKeywordsAndDescription(this.keywords, this.description);
    }
    BlogComponent.prototype.ngOnInit = function () { };
    BlogComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'app-blog',
            templateUrl: './blog.component.html'
        }),
        __metadata("design:paramtypes", [seo_service_1.SEOService, blog_service_1.BlogService])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=blog.component.js.map
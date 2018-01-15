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
var platform_browser_1 = require("@angular/platform-browser");
var SEOService = /** @class */ (function () {
    function SEOService(meta, title) {
        this.meta = meta;
        this.title = title;
        this.author = { name: 'author', content: 'Ereck Gordon' };
    }
    SEOService.prototype.setPageTitle = function (pageTitle) {
        this.title.setTitle(pageTitle);
    };
    SEOService.prototype.setKeywordsAndDescription = function (keywords, description) {
        var _this = this;
        var keywordsObject = { name: 'keywords', content: keywords };
        var descriptionObject = { name: 'description', content: description };
        var tagsToCheck = [this.author, keywordsObject, descriptionObject];
        var unfilteredTags = this.meta.getTags('name');
        tagsToCheck.forEach(function (tag) {
            var filteredTag = unfilteredTags.filter(function (unfilteredTag) { return unfilteredTag.name === tag.name; });
            filteredTag.length > 0 ? _this.meta.updateTag(tag) : _this.meta.addTag(tag);
        });
    };
    SEOService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [platform_browser_1.Meta, platform_browser_1.Title])
    ], SEOService);
    return SEOService;
}());
exports.SEOService = SEOService;
//# sourceMappingURL=seo.service.js.map
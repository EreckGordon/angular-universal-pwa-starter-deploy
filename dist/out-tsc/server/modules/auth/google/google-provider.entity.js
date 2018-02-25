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
var typeorm_1 = require("typeorm");
var GoogleProvider = /** @class */ (function () {
    function GoogleProvider() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], GoogleProvider.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GoogleProvider.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GoogleProvider.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GoogleProvider.prototype, "photoUrl", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GoogleProvider.prototype, "socialUid", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GoogleProvider.prototype, "idToken", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], GoogleProvider.prototype, "accessToken", void 0);
    GoogleProvider = __decorate([
        typeorm_1.Entity()
    ], GoogleProvider);
    return GoogleProvider;
}());
exports.GoogleProvider = GoogleProvider;
//# sourceMappingURL=google-provider.entity.js.map
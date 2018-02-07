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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var environment_1 = require("../environments/environment");
var app_nav_views_1 = require("./app-nav-views");
var ngsw_update_service_1 = require("./shared/ngsw-update.service");
var auth_service_1 = require("./shared/auth/auth.service");
var AppComponent = (function () {
    function AppComponent(router, injector, platformId, auth) {
        this.router = router;
        this.injector = injector;
        this.platformId = platformId;
        this.auth = auth;
        this.views = app_nav_views_1.views;
        if (common_1.isPlatformBrowser(this.platformId) && environment_1.environment.production) {
            this.worker = this.injector.get(ngsw_update_service_1.NGSWUpdateService);
        }
        this.user$ = auth.user$;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
        }),
        __param(2, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [router_1.Router,
            core_1.Injector,
            Object,
            auth_service_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
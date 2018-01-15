"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var index_1 = require("./shared/custom-material-module/index");
var app_routing_1 = require("./app.routing");
var not_found404_component_1 = require("./features/not-found404.component");
var home_component_1 = require("./features/home/home.component");
var about_component_1 = require("./features/about/about.component");
var AppCommonModule = /** @class */ (function () {
    function AppCommonModule() {
    }
    AppCommonModule = __decorate([
        core_1.NgModule({
            declarations: [
                not_found404_component_1.NotFound404Component,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'angular-universal-pwa-starter' }),
                index_1.CustomMaterialModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                http_1.HttpClientXsrfModule.withOptions({
                    cookieName: 'XSRF-TOKEN',
                    headerName: 'x-xsrf-token'
                }),
                router_1.RouterModule.forRoot(app_routing_1.routes, { useHash: false, initialNavigation: 'enabled' })
            ],
            providers: [],
            bootstrap: [],
            exports: [
                index_1.CustomMaterialModule,
                router_1.RouterModule
            ]
        })
    ], AppCommonModule);
    return AppCommonModule;
}());
exports.AppCommonModule = AppCommonModule;
//# sourceMappingURL=app.common.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var service_worker_1 = require("@angular/service-worker");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@nguniversal/common");
var app_component_1 = require("./app.component");
var app_common_module_1 = require("./app.common.module");
var seo_service_1 = require("./shared/seo.service");
var ngsw_update_service_1 = require("./shared/ngsw-update.service");
var environment_1 = require("../environments/environment");
var AppBrowserModule = /** @class */ (function () {
    function AppBrowserModule() {
    }
    AppBrowserModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            declarations: [app_component_1.AppComponent],
            imports: [
                animations_1.BrowserAnimationsModule,
                app_common_module_1.AppCommonModule,
                platform_browser_1.BrowserTransferStateModule,
                common_1.TransferHttpCacheModule,
                service_worker_1.ServiceWorkerModule.register('/ngsw-worker.js', {
                    enabled: environment_1.environment.production,
                }),
            ],
            providers: [seo_service_1.SEOService, ngsw_update_service_1.NGSWUpdateService],
        })
    ], AppBrowserModule);
    return AppBrowserModule;
}());
exports.AppBrowserModule = AppBrowserModule;
//# sourceMappingURL=app.browser.module.js.map
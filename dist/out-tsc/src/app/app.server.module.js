"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_server_1 = require("@angular/platform-server");
var animations_1 = require("@angular/platform-browser/animations");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var app_component_1 = require("./app.component");
var app_common_module_1 = require("./app.common.module");
var seo_service_1 = require("./shared/seo.service");
var AppServerModule = /** @class */ (function () {
    function AppServerModule() {
    }
    AppServerModule = __decorate([
        core_1.NgModule({
            imports: [app_common_module_1.AppCommonModule, animations_1.NoopAnimationsModule, platform_server_1.ServerTransferStateModule, platform_server_1.ServerModule, module_map_ngfactory_loader_1.ModuleMapLoaderModule],
            bootstrap: [app_component_1.AppComponent],
            providers: [seo_service_1.SEOService],
        })
    ], AppServerModule);
    return AppServerModule;
}());
exports.AppServerModule = AppServerModule;
//# sourceMappingURL=app.server.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var index_1 = require("../custom-material-module/index");
var sign_in_1 = require("./components/sign-in");
var auth_guard_1 = require("./guards/auth.guard");
var auth_service_1 = require("./services/auth.service");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [
                sign_in_1.SignInComponent
            ],
            imports: [
                common_1.CommonModule,
                index_1.CustomMaterialModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild([])
            ],
            providers: [
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService
            ],
            exports: [
                sign_in_1.SignInComponent
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var index_1 = require("../../custom-material-module/index");
var social_auth_routing_1 = require("./social-auth.routing");
var social_auth_service_1 = require("./social-auth.service");
var social_auth_sign_in_component_1 = require("./components/social-auth-sign-in.component");
var link_social_to_account_component_1 = require("./components/link-social-to-account.component");
var SocialAuthModule = /** @class */ (function () {
    function SocialAuthModule() {
    }
    SocialAuthModule = __decorate([
        core_1.NgModule({
            declarations: [social_auth_sign_in_component_1.SocialAuthSignInComponent, link_social_to_account_component_1.LinkSocialToAccountComponent],
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(social_auth_routing_1.routes), index_1.CustomMaterialModule],
            providers: [social_auth_service_1.SocialAuthService],
        })
    ], SocialAuthModule);
    return SocialAuthModule;
}());
exports.SocialAuthModule = SocialAuthModule;
//# sourceMappingURL=social-auth.module.js.map
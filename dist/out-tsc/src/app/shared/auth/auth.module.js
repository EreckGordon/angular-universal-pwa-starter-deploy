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
var ng_recaptcha_1 = require("ng-recaptcha");
var forms_2 = require("ng-recaptcha/forms");
var index_1 = require("../custom-material-module/index");
var sign_in_component_1 = require("./components/sign-in.component");
var create_account_component_1 = require("./components/create-account.component");
var request_password_reset_component_1 = require("./components/forgot-password/request-password-reset.component");
var reset_password_component_1 = require("./components/forgot-password/reset-password.component");
var account_management_component_1 = require("./components/account-management/account-management.component");
var change_password_component_1 = require("./components/account-management/change-password.component");
var delete_account_component_1 = require("./components/account-management/delete-account.component");
var confirm_delete_account_dialog_1 = require("./components/account-management/confirm-delete-account.dialog");
var auth_guard_1 = require("./guards/auth.guard");
var auth_service_1 = require("./auth.service");
var auth_routing_1 = require("./auth.routing");
var environment_1 = require("../../../environments/environment");
var globalRecaptchaSettings = {
    siteKey: environment_1.environment.recaptchaSiteKey,
};
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [
                sign_in_component_1.SignInComponent,
                create_account_component_1.CreateAccountComponent,
                request_password_reset_component_1.RequestPasswordResetComponent,
                reset_password_component_1.ResetPasswordComponent,
                account_management_component_1.AccountManagementComponent,
                change_password_component_1.ChangePasswordComponent,
                delete_account_component_1.DeleteAccountComponent,
                confirm_delete_account_dialog_1.ConfirmDeleteAccountDialog,
            ],
            imports: [
                common_1.CommonModule,
                index_1.CustomMaterialModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild(auth_routing_1.routes),
                ng_recaptcha_1.RecaptchaModule.forRoot(),
                forms_2.RecaptchaFormsModule,
            ],
            providers: [
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService,
                {
                    provide: ng_recaptcha_1.RECAPTCHA_SETTINGS,
                    useValue: globalRecaptchaSettings,
                },
            ],
            entryComponents: [confirm_delete_account_dialog_1.ConfirmDeleteAccountDialog],
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
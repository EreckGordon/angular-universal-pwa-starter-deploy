"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sign_in_component_1 = require("./components/sign-in.component");
var create_account_component_1 = require("./components/create-account.component");
var request_password_reset_component_1 = require("./components/forgot-password/request-password-reset.component");
var reset_password_component_1 = require("./components/forgot-password/reset-password.component");
var account_management_component_1 = require("./components/account-management/account-management.component");
var delete_account_component_1 = require("./components/account-management/delete-account.component");
var auth_guard_1 = require("./guards/auth.guard");
exports.routes = [
    { path: 'sign-in', component: sign_in_component_1.SignInComponent },
    { path: 'create-account', component: create_account_component_1.CreateAccountComponent },
    {
        path: 'request-password-reset',
        component: request_password_reset_component_1.RequestPasswordResetComponent,
    },
    { path: 'reset-password', component: reset_password_component_1.ResetPasswordComponent },
    {
        path: 'account',
        children: [
            {
                path: '',
                component: account_management_component_1.AccountManagementComponent,
            },
            {
                path: 'social',
                loadChildren: './social-module/social-auth.module#SocialAuthModule',
            },
        ],
        canActivate: [auth_guard_1.AuthGuard],
    },
    { path: 'delete-account', component: delete_account_component_1.DeleteAccountComponent },
    {
        path: 'social-sign-in',
        loadChildren: './social-module/social-auth.module#SocialAuthModule',
    },
];
//# sourceMappingURL=auth.routing.js.map
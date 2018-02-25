"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var http_1 = require("@angular/common/http");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var material_1 = require("@angular/material");
var environment_1 = require("../../../environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http, platformId, snackbar) {
        this.http = http;
        this.platformId = platformId;
        this.snackbar = snackbar;
        this.userSubject = new ReplaySubject_1.ReplaySubject(1);
        this.user$ = this.userSubject.asObservable();
        this.jsonHeaders = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
        });
        this.jsonOptions = { headers: this.jsonHeaders, withCredentials: true };
        if (common_1.isPlatformBrowser(this.platformId)) {
            document.cookie.includes('XSRF-TOKEN') ? this.reauthenticate() : this.userSubject.next(null);
        }
        else {
            this.userSubject.next(null);
        }
    }
    AuthService.prototype.reauthenticate = function () {
        var _this = this;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/reauthenticate", {}, this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.userSubject.next(null); });
    };
    // use this function when you need to pre-load their basic database access
    AuthService.prototype.createAnonymousUser = function () {
        var _this = this;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/create-anonymous-user", {}, this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.userSubject.next(null); });
    };
    AuthService.prototype.createEmailAndPasswordUserOrUpgradeAnonymousToEmailAndPassword = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.user$.take(1).subscribe(function (user) {
            if (user === null) {
                return _this.createEmailAndPasswordUser({ email: email, password: password });
            }
            else if (_this.isAuthenticatedUser(user) && user.isAnonymous) {
                return _this.upgradeAnonymousUserToEmailAndPasswordUser({ email: email, password: password });
            }
        });
    };
    AuthService.prototype.upgradeAnonymousUserToEmailAndPasswordUser = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.http
            .patch(environment_1.environment.baseUrl + "/api/auth/upgrade-anonymous-user-to-email-and-password", { email: email, password: password }, this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.createEmailAndPasswordUser = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/create-email-and-password-user", { email: email, password: password }, this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.loginWithEmailAndPassword = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/login-email-and-password-user", { email: email, password: password }, this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.requestPasswordReset = function (_a) {
        var _this = this;
        var email = _a.email;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/request-password-reset", { email: email }, this.jsonOptions)
            .take(1)
            .subscribe(function () {
            return _this.snackbar.open("Password Reset Requested", "OK", {
                duration: 20000,
            });
        }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.resetPassword = function (_a) {
        var _this = this;
        var password = _a.password, token = _a.token;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/reset-password", { password: password, token: token }, this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.changePassword = function (_a) {
        var oldPassword = _a.oldPassword, newPassword = _a.newPassword;
        return this.http.post(environment_1.environment.baseUrl + "/api/auth/change-password", { oldPassword: oldPassword, newPassword: newPassword }, this.jsonOptions);
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/logout", {}, this.jsonOptions)
            .take(1)
            .subscribe(function () { return _this.userSubject.next(null); }, function (error) { return console.log(error); });
    };
    AuthService.prototype.deleteAccount = function () {
        var _this = this;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/delete-account", {}, this.jsonOptions)
            .take(1)
            .subscribe(function () { return _this.userSubject.next(null); }, function (error) { return console.log(error); });
    };
    AuthService.prototype.signInWithSocialUser = function (socialInfo) {
        var _this = this;
        this.user$.take(1).subscribe(function (user) {
            if (user === null) {
                return _this.authenticateSocialUser(socialInfo);
            }
            else if (_this.isAuthenticatedUser(user) && user.isAnonymous) {
                return _this.upgradeAnonymousUserToSocial(socialInfo);
            }
            else if (_this.isAuthenticatedUser(user)) {
                return _this.linkProviderToAccount(socialInfo);
            }
        });
    };
    AuthService.prototype.authenticateSocialUser = function (socialInfo) {
        var _this = this;
        this.http
            .post(environment_1.environment.baseUrl + "/api/auth/authenticate-social-user", __assign({}, socialInfo), this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.upgradeAnonymousUserToSocial = function (socialInfo) {
        var _this = this;
        this.http
            .patch(environment_1.environment.baseUrl + "/api/auth/upgrade-anonymous-user-to-social", __assign({}, socialInfo), this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.assignErrorToUserSubject(error); });
    };
    AuthService.prototype.linkProviderToAccount = function (providerInfo) {
        var _this = this;
        this.http
            .patch(environment_1.environment.baseUrl + "/api/auth/link-provider-to-account", __assign({}, providerInfo), this.jsonOptions)
            .take(1)
            .subscribe(function (user) { return _this.userSubject.next(user); }, function (error) {
            console.log(error);
            return _this.snackbar.open('Unknown Error, sorry about that', 'OK', { duration: 5000 });
        });
    };
    // used to clear error message manually after the component has performed its localized error logic
    // avoids errors when user navigates away from page after an error.
    AuthService.prototype.errorHandled = function () {
        this.userSubject.next(null);
    };
    AuthService.prototype.assignErrorToUserSubject = function (error) {
        this.userSubject.next(error);
    };
    AuthService.prototype.isAuthenticatedUser = function (user) {
        return user.id !== undefined;
    };
    AuthService.prototype.isHttpErrorResponse = function (user) {
        return user.error !== undefined;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [http_1.HttpClient, Object, material_1.MatSnackBar])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
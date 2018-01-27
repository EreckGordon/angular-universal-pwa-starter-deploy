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
var http_1 = require("@angular/common/http");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var environment_1 = require("../../../../environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http, platformId) {
        this.http = http;
        this.platformId = platformId;
        this.userSubject = new ReplaySubject_1.ReplaySubject(1);
        this.user$ = this.userSubject.asObservable();
        this.jsonHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        this.jsonOptions = { headers: this.jsonHeaders, withCredentials: true };
        if (common_1.isPlatformBrowser(this.platformId)) {
            document.cookie.length > 0 ? this.reauthenticate() : this.createAnonymousUser();
        }
        else {
            this.userSubject.next(null);
        }
    }
    AuthService.prototype.reauthenticate = function () {
        var _this = this;
        this.http.post(environment_1.environment.baseUrl + "/auth/reauthenticate", {}, this.jsonOptions)
            .take(1).subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.userSubject.next(null); });
    };
    AuthService.prototype.createAnonymousUser = function () {
        var _this = this;
        this.http.post(environment_1.environment.baseUrl + "/auth/create-anonymous-user", {}, this.jsonOptions)
            .take(1).subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.userSubject.next(null); });
    };
    AuthService.prototype.upgradeAnonymousUserToEmailAndPasswordUser = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.http.patch(environment_1.environment.baseUrl + "/auth/upgrade-anonymous-user-to-email-and-password", { email: email, password: password }, this.jsonOptions)
            .take(1).subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.userSubject.next(null); });
    };
    AuthService.prototype.createEmailAndPasswordUser = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.http.post(environment_1.environment.baseUrl + "/auth/create-email-and-password-user", { email: email, password: password }, this.jsonOptions)
            .take(1).subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.userSubject.next(null); });
    };
    AuthService.prototype.loginWithEmailAndPassword = function (_a) {
        var _this = this;
        var email = _a.email, password = _a.password;
        this.http.post(environment_1.environment.baseUrl + "/auth/login-email-and-password-user", { email: email, password: password }, this.jsonOptions)
            .take(1).subscribe(function (user) { return _this.userSubject.next(user); }, function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.handleError = function (error) {
        console.log(error);
        this.userSubject.next(error.error);
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.http.post(environment_1.environment.baseUrl + "/auth/logout", {}, this.jsonOptions)
            .take(1).subscribe(function (user) { return _this.userSubject.next(null); }, function (error) { return console.log(error); });
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [http_1.HttpClient, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
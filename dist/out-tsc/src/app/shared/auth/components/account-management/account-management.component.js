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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../../auth.service");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var AccountManagementComponent = /** @class */ (function () {
    function AccountManagementComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.destroy = new Subject_1.Subject();
        this.showChangePassword = false;
        this.hasEmailAndPasswordAuthProvider = false;
        this.hasGoogleAuthProvider = false;
        this.hasFacebookAuthProvider = false;
    }
    AccountManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (user === null || (_this.auth.isAuthenticatedUser(user) && !user.email)) {
                return _this.router.navigate(['/']);
            }
            if (_this.auth.isAuthenticatedUser(user)) {
                _this.user = user;
                _this.hasEmailAndPasswordAuthProvider = user.authProviders.includes('emailAndPassword');
                _this.hasGoogleAuthProvider = user.authProviders.includes('google');
                _this.hasFacebookAuthProvider = user.authProviders.includes('facebook');
            }
        });
    };
    AccountManagementComponent.prototype.logout = function () {
        this.auth.logout();
    };
    AccountManagementComponent.prototype.toggleShowChangePassword = function () {
        this.showChangePassword = !this.showChangePassword;
    };
    AccountManagementComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    AccountManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-account-management',
            templateUrl: './account-management.component.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], AccountManagementComponent);
    return AccountManagementComponent;
}());
exports.AccountManagementComponent = AccountManagementComponent;
//# sourceMappingURL=account-management.component.js.map
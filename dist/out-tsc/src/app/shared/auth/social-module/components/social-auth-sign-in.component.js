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
var social_auth_service_1 = require("../social-auth.service");
var material_1 = require("@angular/material");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var SocialAuthSignInComponent = /** @class */ (function () {
    function SocialAuthSignInComponent(socialAuthService, auth, router, snackbar) {
        this.socialAuthService = socialAuthService;
        this.auth = auth;
        this.router = router;
        this.snackbar = snackbar;
        this.destroy = new Subject_1.Subject();
    }
    SocialAuthSignInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (user === null) {
            }
            else if (_this.auth.isAuthenticatedUser(user) && !user.isAnonymous) {
                _this.router.navigate(['/account']);
            }
            else if (_this.auth.isHttpErrorResponse(user)) {
                _this.auth.errorHandled();
                _this.snackbar.open("Unknown error, sorry about that.", "OK", {
                    duration: 5000,
                });
            }
        });
    };
    SocialAuthSignInComponent.prototype.signInWithGoogle = function () {
        this.socialAuthService.signIn('google');
    };
    SocialAuthSignInComponent.prototype.signInWithFacebook = function () {
        this.socialAuthService.signIn('facebook');
    };
    SocialAuthSignInComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    SocialAuthSignInComponent = __decorate([
        core_1.Component({
            selector: 'app-social-auth-sign-in',
            templateUrl: 'social-auth-sign-in.component.html',
        }),
        __metadata("design:paramtypes", [social_auth_service_1.SocialAuthService,
            auth_service_1.AuthService,
            router_1.Router,
            material_1.MatSnackBar])
    ], SocialAuthSignInComponent);
    return SocialAuthSignInComponent;
}());
exports.SocialAuthSignInComponent = SocialAuthSignInComponent;
//# sourceMappingURL=social-auth-sign-in.component.js.map
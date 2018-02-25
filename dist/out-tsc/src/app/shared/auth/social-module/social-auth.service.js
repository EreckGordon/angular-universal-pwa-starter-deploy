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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var auth_service_1 = require("../auth.service");
var social_auth_service_config_class_1 = require("./classes/social-auth-service-config.class");
var facebook_login_provider_1 = require("./providers/facebook-login-provider");
var google_login_provider_1 = require("./providers/google-login-provider");
var SocialAuthService = /** @class */ (function () {
    function SocialAuthService(authService, platformId) {
        this.authService = authService;
        this.platformId = platformId;
        this.config = new social_auth_service_config_class_1.SocialAuthServiceConfig([
            {
                id: google_login_provider_1.GoogleLoginProvider.PROVIDER_ID,
                provider: new google_login_provider_1.GoogleLoginProvider(environment_1.environment.googleLoginProvider),
            },
            {
                id: facebook_login_provider_1.FacebookLoginProvider.PROVIDER_ID,
                provider: new facebook_login_provider_1.FacebookLoginProvider(environment_1.environment.facebookLoginProvider),
            },
        ]);
        this.providers = this.config.providers;
        this.providers = this.config.providers;
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.providers.forEach(function (provider, key) { return provider.initialize(); });
        }
    }
    SocialAuthService_1 = SocialAuthService;
    SocialAuthService.prototype.signIn = function (providerId, opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn().then(function (user) {
                    user.provider = providerId;
                    _this.authService.signInWithSocialUser(user);
                });
            }
            else {
                reject(SocialAuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    SocialAuthService.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.authService.user$.take(1).subscribe(function (user) {
                if (user['providerId'] !== ('google' || 'facebook')) {
                    reject(SocialAuthService_1.ERR_NOT_LOGGED_IN);
                }
                else {
                    var providerId = user['providerId'];
                    var providerObject = _this.providers.get(providerId);
                    if (providerObject) {
                        providerObject.signOut().then(function () {
                            resolve();
                        });
                    }
                    else {
                        reject(SocialAuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        });
    };
    SocialAuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    SocialAuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
    SocialAuthService = SocialAuthService_1 = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [auth_service_1.AuthService, Object])
    ], SocialAuthService);
    return SocialAuthService;
    var SocialAuthService_1;
}());
exports.SocialAuthService = SocialAuthService;
//# sourceMappingURL=social-auth.service.js.map
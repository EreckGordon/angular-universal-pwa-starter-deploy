"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_login_provider_class_1 = require("../classes/base-login-provider.class");
var social_user_class_1 = require("../classes/social-user.class");
var GoogleLoginProvider = /** @class */ (function (_super) {
    __extends(GoogleLoginProvider, _super);
    function GoogleLoginProvider(clientId, opt) {
        if (opt === void 0) { opt = { scope: 'email' }; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        return _this;
    }
    GoogleLoginProvider.prototype.initialize = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadScript(GoogleLoginProvider.PROVIDER_ID, '//apis.google.com/js/platform.js', function () {
                gapi.load('auth2', function () {
                    _this.auth2 = gapi.auth2.init(__assign({}, _this.opt, { client_id: _this.clientId }));
                    _this.auth2.then(function () {
                        if (_this.auth2.isSignedIn.get()) {
                            var user = new social_user_class_1.SocialUser();
                            var profile = _this.auth2.currentUser.get().getBasicProfile();
                            var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                            var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                            user.socialUid = profile.getId();
                            user.name = profile.getName();
                            user.email = profile.getEmail();
                            user.photoUrl = profile.getImageUrl();
                            user.firstName = profile.getGivenName();
                            user.lastName = profile.getFamilyName();
                            user.accessToken = token;
                            user.idToken = backendToken;
                            resolve(user);
                        }
                    });
                });
            });
        });
    };
    GoogleLoginProvider.prototype.signIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var promise = _this.auth2.signIn();
            promise.then(function () {
                var user = new social_user_class_1.SocialUser();
                var profile = _this.auth2.currentUser.get().getBasicProfile();
                var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                user.socialUid = profile.getId();
                user.name = profile.getName();
                user.email = profile.getEmail();
                user.photoUrl = profile.getImageUrl();
                user.accessToken = token;
                user.idToken = backendToken;
                resolve(user);
            });
        });
    };
    GoogleLoginProvider.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth2.signOut().then(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    GoogleLoginProvider.prototype.revokeAuth = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth2.disconnect().then(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    GoogleLoginProvider.PROVIDER_ID = 'google';
    return GoogleLoginProvider;
}(base_login_provider_class_1.BaseLoginProvider));
exports.GoogleLoginProvider = GoogleLoginProvider;
//# sourceMappingURL=google-login-provider.js.map
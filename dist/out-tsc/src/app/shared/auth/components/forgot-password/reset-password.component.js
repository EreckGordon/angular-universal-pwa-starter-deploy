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
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var jwt = require("jsonwebtoken");
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(fb, auth, router, route, snackbar) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.snackbar = snackbar;
        this.destroy = new Subject_1.Subject();
        this.decodedToken = {};
        this.showPassword = false;
        this.requestSent = false;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            password: ['', forms_1.Validators.required],
        });
        this.route.queryParams.take(1).subscribe(function (params) {
            if (!!params.token) {
                _this.encodedToken = params.token;
                _this.decodedToken = jwt.decode(params.token);
            }
            else {
                _this.encodedToken = 'does not exist';
                _this.decodedToken['email'] = 'does not exist';
            }
        });
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (user === null) {
            }
            else if (_this.auth.isAuthenticatedUser(user) && user.isAnonymous) {
            }
            else if (_this.auth.isHttpErrorResponse(user)) {
                _this.handlePasswordError(user);
            }
            else if (_this.auth.isAuthenticatedUser(user) &&
                user.email === _this.decodedToken['email']) {
                _this.router.navigate(['/account']);
            }
        });
    };
    ResetPasswordComponent.prototype.handlePasswordError = function (error) {
        this.requestSent = false;
        this.auth.errorHandled();
        this.form.patchValue({ password: '' });
        if (Array.isArray(error.error)) {
            switch (error.error[0]) {
                case 'min':
                    return this.snackbar.open("Password is too short", "OK", {
                        duration: 5000,
                    });
                case 'oneOf':
                    return this.snackbar.open("Pick a better password", "OK", {
                        duration: 5000,
                    });
                default:
                    return this.snackbar.open("" + error.error[0], "OK", {
                        duration: 5000,
                    });
            }
        }
        return this.snackbar.open("" + error.error, "OK", { duration: 5000 });
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        this.requestSent = true;
        this.auth.resetPassword({
            password: this.form.value.password,
            token: this.encodedToken,
        });
    };
    ResetPasswordComponent.prototype.toggleShowPassword = function () {
        this.showPassword = !this.showPassword;
    };
    ResetPasswordComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatSnackBar])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map
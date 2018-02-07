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
var auth_service_1 = require("../auth.service");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var ng_recaptcha_1 = require("ng-recaptcha");
var SignInComponent = (function () {
    function SignInComponent(fb, auth, router, snackbar) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.snackbar = snackbar;
        this.destroy = new Subject_1.Subject();
        this.showPassword = false;
    }
    SignInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            recaptcha: [null, forms_1.Validators.required],
        });
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (user === null) {
            }
            else if (_this.auth.isAuthenticatedUser(user) && !user.isAnonymous) {
                _this.router.navigate(['/account']);
            }
            else if (_this.auth.isHttpErrorResponse(user) &&
                user.error === 'user does not exist') {
                _this.auth.errorHandled();
                _this.form.patchValue({ email: '', password: '' });
                _this.recaptcha.reset();
                _this.snackbar.open("User does not exist", "OK", {
                    duration: 5000,
                });
            }
            else if (_this.auth.isHttpErrorResponse(user) && user.error === 'Password Invalid') {
                _this.auth.errorHandled();
                _this.form.patchValue({ password: '' });
                _this.recaptcha.reset();
                _this.snackbar.open("Your password is invalid", "OK", {
                    duration: 5000,
                });
            }
        });
    };
    SignInComponent.prototype.signIn = function () {
        this.auth.loginWithEmailAndPassword(this.form.value);
    };
    SignInComponent.prototype.toggleShowPassword = function () {
        this.showPassword = !this.showPassword;
    };
    SignInComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    __decorate([
        core_1.ViewChild('recaptcha'),
        __metadata("design:type", ng_recaptcha_1.RecaptchaComponent)
    ], SignInComponent.prototype, "recaptcha", void 0);
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-in',
            templateUrl: './sign-in.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            router_1.Router,
            material_1.MatSnackBar])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map
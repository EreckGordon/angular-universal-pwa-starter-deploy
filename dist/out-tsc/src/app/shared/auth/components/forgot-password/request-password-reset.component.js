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
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var material_1 = require("@angular/material");
var ng_recaptcha_1 = require("ng-recaptcha");
var RequestPasswordResetComponent = (function () {
    function RequestPasswordResetComponent(fb, auth, router, snackbar) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.snackbar = snackbar;
        this.destroy = new Subject_1.Subject();
        this.requestSent = false;
    }
    RequestPasswordResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            recaptcha: [null, forms_1.Validators.required],
        });
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (user === null) {
            }
            else if (_this.auth.isHttpErrorResponse(user) &&
                user.error === 'user does not exist') {
                _this.requestSent = false;
                _this.form.patchValue({ email: '' });
                _this.recaptcha.reset();
                _this.auth.errorHandled();
                _this.snackbar.open("User does not exist", "OK", {
                    duration: 10000,
                });
            }
        });
    };
    RequestPasswordResetComponent.prototype.requestPasswordReset = function () {
        this.requestSent = true;
        this.auth.requestPasswordReset(this.form.value);
    };
    RequestPasswordResetComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    __decorate([
        core_1.ViewChild('recaptcha'),
        __metadata("design:type", ng_recaptcha_1.RecaptchaComponent)
    ], RequestPasswordResetComponent.prototype, "recaptcha", void 0);
    RequestPasswordResetComponent = __decorate([
        core_1.Component({
            selector: 'app-request-password-reset',
            templateUrl: './request-password-reset.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            router_1.Router,
            material_1.MatSnackBar])
    ], RequestPasswordResetComponent);
    return RequestPasswordResetComponent;
}());
exports.RequestPasswordResetComponent = RequestPasswordResetComponent;
//# sourceMappingURL=request-password-reset.component.js.map
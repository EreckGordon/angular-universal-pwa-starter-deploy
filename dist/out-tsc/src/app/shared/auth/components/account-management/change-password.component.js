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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var material_1 = require("@angular/material");
var auth_service_1 = require("../../auth.service");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(auth, fb, snackbar) {
        this.auth = auth;
        this.fb = fb;
        this.snackbar = snackbar;
        this.destroy = new Subject_1.Subject();
        this.showOldPassword = false;
        this.showNewPassword = false;
        this.passwordChanged = new core_1.EventEmitter();
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            oldPassword: ['', forms_1.Validators.required],
            newPassword: ['', forms_1.Validators.required],
        });
    };
    ChangePasswordComponent.prototype.toggleShowOldPassword = function () {
        this.showOldPassword = !this.showOldPassword;
    };
    ChangePasswordComponent.prototype.toggleShowNewPassword = function () {
        this.showNewPassword = !this.showNewPassword;
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        var _this = this;
        this.auth
            .changePassword(__assign({}, this.form.value))
            .take(1)
            .subscribe(function () { return _this.passwordChanged.emit(); }, function (error) { return _this.handlePasswordError(error); });
    };
    ChangePasswordComponent.prototype.handlePasswordError = function (error) {
        if (Array.isArray(error.error)) {
            this.form.patchValue({ newPassword: '' });
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
        this.form.patchValue({ oldPassword: '' });
        return this.snackbar.open("" + error.error, "OK", { duration: 5000 });
    };
    ChangePasswordComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChangePasswordComponent.prototype, "passwordChanged", void 0);
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, forms_1.FormBuilder, material_1.MatSnackBar])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change-password.component.js.map
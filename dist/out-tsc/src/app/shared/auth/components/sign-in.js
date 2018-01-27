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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var forms_1 = require("@angular/forms");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(fb, auth, router) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.destroy = new Subject_1.Subject();
    }
    SignInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (_this.isAuthenticatedUser(user) && !user.isAnonymous)
                _this.router.navigate(['/protected']);
            else if (user.error === 'user does not exist') {
                _this.form.patchValue({ email: '', password: '' });
            }
            else if (user === 'Password Invalid') {
                _this.form.patchValue({ password: '' });
            }
        });
    };
    SignInComponent.prototype.isAuthenticatedUser = function (user) {
        return user.id !== undefined;
    };
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'sign-in',
            templateUrl: './sign-in.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService, router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
(function () {
    _this.auth.loginWithEmailAndPassword(_this.form.value);
});
ngOnDestroy();
{
    this.destroy.next();
}
//# sourceMappingURL=sign-in.js.map
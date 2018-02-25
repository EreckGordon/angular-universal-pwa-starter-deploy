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
var material_1 = require("@angular/material");
var auth_service_1 = require("../../auth.service");
var confirm_delete_account_dialog_1 = require("./confirm-delete-account.dialog");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/takeUntil");
var DeleteAccountComponent = /** @class */ (function () {
    function DeleteAccountComponent(auth, router, dialog) {
        this.auth = auth;
        this.router = router;
        this.dialog = dialog;
        this.destroy = new Subject_1.Subject();
    }
    DeleteAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.user$.takeUntil(this.destroy).subscribe(function (user) {
            if (user === null || (_this.auth.isAuthenticatedUser(user) && !user.email)) {
                return _this.router.navigate(['/']);
            }
        });
    };
    DeleteAccountComponent.prototype.deleteAccountDialog = function () {
        var _this = this;
        this.deleteAccountDialogRef = this.dialog.open(confirm_delete_account_dialog_1.ConfirmDeleteAccountDialog, {
            disableClose: false,
        });
        this.deleteAccountDialogRef
            .afterClosed()
            .take(1)
            .subscribe(function (result) {
            if (result === 'Deleting Account') {
                _this.deleteAccount();
            }
        });
    };
    DeleteAccountComponent.prototype.deleteAccount = function () {
        this.auth.deleteAccount();
    };
    DeleteAccountComponent.prototype.ngOnDestroy = function () {
        this.destroy.next();
    };
    DeleteAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-delete-account',
            templateUrl: './delete-account.component.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, material_1.MatDialog])
    ], DeleteAccountComponent);
    return DeleteAccountComponent;
}());
exports.DeleteAccountComponent = DeleteAccountComponent;
//# sourceMappingURL=delete-account.component.js.map
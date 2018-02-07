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
/* tslint:disable: component-class-suffix */
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var ConfirmDeleteAccountDialog = (function () {
    function ConfirmDeleteAccountDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    ConfirmDeleteAccountDialog = __decorate([
        core_1.Component({
            selector: 'app-delete-account-dialog',
            template: "\n        <div class=\"center-everything\"><h4 mat-dialog-title>Permanently Delete your Account?</h4></div>\n\n        <div class=\"center-everything\"><p> Click yes to delete.</p></div><br>\n\n        <div class=\"center-everything\"><p>Hit <b>Esc</b> or <b>click outside this box</b> to cancel.</p></div><br>\n\n        <mat-dialog-content>\n            <div class=\"center-everything\">\n                <button mat-raised-button color=\"warn\" (click)=\"dialogRef.close('Deleting Account')\">Yes</button>\n            </div>\n        </mat-dialog-content>\n    ",
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef])
    ], ConfirmDeleteAccountDialog);
    return ConfirmDeleteAccountDialog;
}());
exports.ConfirmDeleteAccountDialog = ConfirmDeleteAccountDialog;
//# sourceMappingURL=confirm-delete-account.dialog.js.map
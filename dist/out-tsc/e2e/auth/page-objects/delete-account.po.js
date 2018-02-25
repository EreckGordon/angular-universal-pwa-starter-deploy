"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
// $ = element(by.css())
// $$ = element.all(by.css())
var DeleteAccountPage = /** @class */ (function () {
    function DeleteAccountPage() {
    }
    DeleteAccountPage.prototype.getDeleteAccountButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Delete Account'; }); });
    };
    DeleteAccountPage.prototype.getConfirmDeleteAccountButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Yes'; }); });
    };
    return DeleteAccountPage;
}());
exports.DeleteAccountPage = DeleteAccountPage;
//# sourceMappingURL=delete-account.po.js.map
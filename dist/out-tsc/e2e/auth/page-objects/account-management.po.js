"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
// $ = element(by.css())
// $$ = element.all(by.css())
var AccountManagementPage = /** @class */ (function () {
    function AccountManagementPage() {
    }
    AccountManagementPage.prototype.navigateToAccountManagement = function () {
        return protractor_1.browser.get('/account');
    };
    AccountManagementPage.prototype.getLogOutButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Log Out'; }); });
    };
    AccountManagementPage.prototype.getChangePasswordButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Change Password'; }); });
    };
    AccountManagementPage.prototype.getCancelChangePasswordButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Cancel'; }); });
    };
    AccountManagementPage.prototype.getDeleteAccountButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Delete Account'; }); });
    };
    return AccountManagementPage;
}());
exports.AccountManagementPage = AccountManagementPage;
//# sourceMappingURL=account-management.po.js.map
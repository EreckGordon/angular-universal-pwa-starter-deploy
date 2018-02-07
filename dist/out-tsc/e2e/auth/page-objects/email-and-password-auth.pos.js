"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var sign_in_po_1 = require("./sign-in.po");
var create_account_po_1 = require("./create-account.po");
var request_password_reset_po_1 = require("./request-password-reset.po");
var account_management_po_1 = require("./account-management.po");
var delete_account_po_1 = require("./delete-account.po");
var EmailAndPasswordAuthPages = (function () {
    function EmailAndPasswordAuthPages() {
        this.signInPage = new sign_in_po_1.SignInPage();
        this.createAccountPage = new create_account_po_1.CreateAccountPage();
        this.requestPasswordResetPage = new request_password_reset_po_1.RequestPasswordResetPage();
        this.accountManagementPage = new account_management_po_1.AccountManagementPage();
        this.deleteAccountPage = new delete_account_po_1.DeleteAccountPage();
    }
    EmailAndPasswordAuthPages.prototype.getEmailInput = function () {
        return protractor_1.$('input[formcontrolname=email]');
    };
    EmailAndPasswordAuthPages.prototype.getPasswordInput = function () {
        return protractor_1.$('input[formcontrolname=password]');
    };
    EmailAndPasswordAuthPages.prototype.getOldPasswordInput = function () {
        return protractor_1.$('input[formcontrolname=oldPassword]');
    };
    EmailAndPasswordAuthPages.prototype.getNewPasswordInput = function () {
        return protractor_1.$('input[formcontrolname=newPassword]');
    };
    EmailAndPasswordAuthPages.prototype.getRecaptcha = function () {
        return protractor_1.$('re-captcha');
    };
    EmailAndPasswordAuthPages.prototype.getCurrentUrl = function () {
        return protractor_1.browser.getCurrentUrl();
    };
    EmailAndPasswordAuthPages.prototype.sleep = function (ms) {
        return protractor_1.browser.sleep(ms);
    };
    return EmailAndPasswordAuthPages;
}());
exports.EmailAndPasswordAuthPages = EmailAndPasswordAuthPages;
//# sourceMappingURL=email-and-password-auth.pos.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
// $ = element(by.css())
// $$ = element.all(by.css())
var SignInPage = (function () {
    function SignInPage() {
    }
    SignInPage.prototype.navigateToSignIn = function () {
        return protractor_1.browser.get('/sign-in');
    };
    SignInPage.prototype.getRecaptcha = function () {
        return protractor_1.$('re-captcha');
    };
    SignInPage.prototype.getLoginButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Login'; }); });
    };
    SignInPage.prototype.waitForLoginToBeClickable = function () {
        return protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(this.getLoginButton().get(0)));
    };
    return SignInPage;
}());
exports.SignInPage = SignInPage;
//# sourceMappingURL=sign-in.po.js.map
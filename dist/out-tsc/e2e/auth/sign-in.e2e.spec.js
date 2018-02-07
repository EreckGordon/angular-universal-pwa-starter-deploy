"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sign_in_po_1 = require("./page-objects/sign-in.po");
describe('Sign In Page', function () {
    var page;
    beforeEach(function () {
        page = new sign_in_po_1.SignInPage();
        page.navigateToSignIn();
    });
    it('should have a Header that says "Sign in"', function () {
        expect(page.getHeaderText()).toBe('Sign in');
    });
    var enterEmailPasswordAndCaptcha = function (email, password) {
        page.getEmailInput().sendKeys(email);
        page.getPasswordInput().sendKeys(password);
        page.getRecaptcha().click();
        page.waitForLoginToBeClickable();
    };
    it('should enable login button after filling out login form', function () {
        enterEmailPasswordAndCaptcha('test-user@fake-email.com', 'superRealPassword');
        page
            .getLoginButton()
            .getAttribute('ng-reflect-disabled')
            .then(function (isDisabled) { return expect(isDisabled[0]).toBe('false'); });
    });
    it('should disable login button after failing to log in', function () {
        enterEmailPasswordAndCaptcha('test-user@fake-email.com', 'superRealPassword');
        page.getLoginButton().click();
        page
            .getLoginButton()
            .getAttribute('ng-reflect-disabled')
            .then(function (isDisabled) { return expect(isDisabled[0]).toBe('true'); });
    });
    // upon successful login, check via:
    //page.getCurrentUrl().then(url => expect(url).toBe('http://localhost:4200/account'))
});
//# sourceMappingURL=sign-in.e2e.spec.js.map
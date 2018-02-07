"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_and_password_auth_pos_1 = require("./page-objects/email-and-password-auth.pos");
describe('Email and Password User Behavior', function () {
    var auth = new email_and_password_auth_pos_1.EmailAndPasswordAuthPages();
    var validEmail = 'totally-real-user@legitimate-email.com';
    var invalidEmail = 'give-me-an-account';
    var validPassword = 'totallyRealPassword';
    var newPassword = 'totallyRealPassword-new';
    var invalidPasswordTooShort = 'letMeIn';
    var invalidPasswordTypo = 'totallyrealPassword';
    var enterEmailPasswordAndCaptcha = function (email, password) {
        auth.getEmailInput().sendKeys(email);
        auth.getPasswordInput().sendKeys(password);
        auth.getRecaptcha().click();
    };
    it('attempt to create account and fail: invalid email', function () {
        auth.createAccountPage.navigateToCreateAccount();
        enterEmailPasswordAndCaptcha(invalidEmail, validPassword);
        auth.createAccountPage
            .getCreateAccountButton()
            .getAttribute('ng-reflect-disabled')
            .then(function (isDisabled) { return expect(isDisabled[0]).toBe('true'); });
    });
    it('attempt to create account and fail: password too short', function () {
        auth.createAccountPage.navigateToCreateAccount();
        enterEmailPasswordAndCaptcha(validEmail, invalidPasswordTooShort);
        auth.createAccountPage.waitForCreateAccountToBeClickable();
        auth.createAccountPage.getCreateAccountButton().click();
        auth.createAccountPage
            .getCreateAccountButton()
            .getAttribute('ng-reflect-disabled')
            .then(function (isDisabled) { return expect(isDisabled[0]).toBe('true'); });
    });
    it('create account', function () {
        auth.createAccountPage.navigateToCreateAccount();
        enterEmailPasswordAndCaptcha(validEmail, validPassword);
        auth.createAccountPage.waitForCreateAccountToBeClickable();
        auth.createAccountPage.getCreateAccountButton().click();
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/account'); });
    });
    it('log out', function () {
        auth.accountManagementPage.navigateToAccountManagement();
        auth.accountManagementPage.getLogOutButton().click();
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/'); });
    });
    it('attempt to create account and fail: email taken', function () {
        auth.createAccountPage.navigateToCreateAccount();
        enterEmailPasswordAndCaptcha(validEmail, validPassword);
        auth.createAccountPage.waitForCreateAccountToBeClickable();
        auth.createAccountPage.getCreateAccountButton().click();
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/create-account'); });
    });
    it('attempt to log in and fail: wrong password', function () {
        auth.signInPage.navigateToSignIn();
        enterEmailPasswordAndCaptcha(validEmail, invalidPasswordTypo);
        auth.signInPage.waitForLoginToBeClickable();
        auth.signInPage.getLoginButton().click();
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/sign-in'); });
    });
    it('log in', function () {
        auth.signInPage.navigateToSignIn();
        enterEmailPasswordAndCaptcha(validEmail, validPassword);
        auth.signInPage.waitForLoginToBeClickable();
        auth.signInPage.getLoginButton().click();
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/account'); });
    });
    it('cancel change password', function () {
        auth.accountManagementPage.navigateToAccountManagement();
        auth.accountManagementPage.getChangePasswordButton().click();
        auth.accountManagementPage.getCancelChangePasswordButton().click();
    });
    it('attempt to change password and fail: wrong password', function () {
        auth.accountManagementPage.navigateToAccountManagement();
        auth.accountManagementPage.getChangePasswordButton().click();
        auth.getOldPasswordInput().sendKeys(invalidPasswordTypo);
        auth.getNewPasswordInput().sendKeys(newPassword);
        auth.accountManagementPage.getChangePasswordButton().click();
        auth
            .getOldPasswordInput()
            .getAttribute('value')
            .then(function (inputValue) { return expect(inputValue).toBe(''); });
    });
    it('attempt to change password and fail: password too short', function () {
        auth.accountManagementPage.navigateToAccountManagement();
        auth.accountManagementPage.getChangePasswordButton().click();
        auth.getOldPasswordInput().sendKeys(validPassword);
        auth.getNewPasswordInput().sendKeys(invalidPasswordTooShort);
        auth.accountManagementPage.getChangePasswordButton().click();
        auth
            .getNewPasswordInput()
            .getAttribute('value')
            .then(function (inputValue) { return expect(inputValue).toBe(''); });
    });
    it('change password', function () {
        auth.accountManagementPage.navigateToAccountManagement();
        auth.accountManagementPage.getChangePasswordButton().click();
        auth.getOldPasswordInput().sendKeys(validPassword);
        auth.getNewPasswordInput().sendKeys(newPassword);
        auth.accountManagementPage.getChangePasswordButton().click();
        expect(auth.accountManagementPage.getCancelChangePasswordButton().count()).toBe(0);
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/account'); });
    });
    it('delete account', function () {
        auth.accountManagementPage.navigateToAccountManagement();
        auth.accountManagementPage.getDeleteAccountButton().click();
        auth.deleteAccountPage.getDeleteAccountButton().click();
        auth.deleteAccountPage.getConfirmDeleteAccountButton().click();
        auth.sleep(500);
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/'); });
    });
    it('attempt to login and fail: account does not exist', function () {
        auth.signInPage.navigateToSignIn();
        enterEmailPasswordAndCaptcha(validEmail, validPassword);
        auth.signInPage.waitForLoginToBeClickable();
        auth.signInPage.getLoginButton().click();
        auth.getCurrentUrl().then(function (url) { return expect(url).toBe('http://localhost:4200/sign-in'); });
    });
    it('attempt password reset request and fail: email does not exist', function () {
        auth.requestPasswordResetPage.navigateToRequestPasswordReset();
        auth.getEmailInput().sendKeys(validEmail);
        auth.getRecaptcha().click();
        auth.requestPasswordResetPage.waitForRequestPasswordResetToBeClickable();
        auth.requestPasswordResetPage.getRequestPasswordResetButton().click();
        auth
            .getEmailInput()
            .getAttribute('value')
            .then(function (inputValue) { return expect(inputValue).toBe(''); });
    });
    it("to do: request password reset\n            skipping until i decide what to do with this spam that this feature generates\n            probably make a dummy gmail account, and give its credentials to dotenv\n            then testing the full password reset functionality", function () { });
});
//# sourceMappingURL=email-and-password-behavior.e2e.spec.js.map
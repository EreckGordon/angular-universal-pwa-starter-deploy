"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
// $ = element(by.css())
// $$ = element.all(by.css())
var CreateAccountPage = (function () {
    function CreateAccountPage() {
    }
    CreateAccountPage.prototype.navigateToCreateAccount = function () {
        return protractor_1.browser.get('/create-account');
    };
    CreateAccountPage.prototype.getCreateAccountButton = function () {
        return protractor_1.$$('button').filter(function (button) {
            return button.getText().then(function (text) { return text === 'Create Account'; });
        });
    };
    CreateAccountPage.prototype.waitForCreateAccountToBeClickable = function () {
        return protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(this.getCreateAccountButton().get(0)));
    };
    return CreateAccountPage;
}());
exports.CreateAccountPage = CreateAccountPage;
//# sourceMappingURL=create-account.po.js.map
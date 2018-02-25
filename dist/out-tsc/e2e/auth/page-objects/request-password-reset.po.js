"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
// $ = element(by.css())
// $$ = element.all(by.css())
var RequestPasswordResetPage = /** @class */ (function () {
    function RequestPasswordResetPage() {
    }
    RequestPasswordResetPage.prototype.navigateToRequestPasswordReset = function () {
        return protractor_1.browser.get('/request-password-reset');
    };
    RequestPasswordResetPage.prototype.getRequestPasswordResetButton = function () {
        return protractor_1.$$('button').filter(function (button) { return button.getText().then(function (text) { return text === 'Request Password Reset'; }); });
    };
    RequestPasswordResetPage.prototype.waitForRequestPasswordResetToBeClickable = function () {
        return protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(this.getRequestPasswordResetButton().get(0)));
    };
    return RequestPasswordResetPage;
}());
exports.RequestPasswordResetPage = RequestPasswordResetPage;
//# sourceMappingURL=request-password-reset.po.js.map
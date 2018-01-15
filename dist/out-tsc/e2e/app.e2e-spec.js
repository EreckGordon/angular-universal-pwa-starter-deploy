"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_po_1 = require("./app.po");
describe('Angular Universal PWA Starter App', function () {
    var page;
    beforeEach(function () {
        page = new app_po_1.AppPage();
    });
    it('should have a top nav', function () {
        page.navigateTo();
        expect(page.getTopNav().getTagName()).toMatch('nav');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map
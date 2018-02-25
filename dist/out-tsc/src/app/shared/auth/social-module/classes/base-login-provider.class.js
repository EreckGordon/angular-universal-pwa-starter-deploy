"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
    }
    BaseLoginProvider.prototype.loadScript = function (id, src, onload) {
        if (document.getElementById(id)) {
            return;
        }
        var signInJS = document.createElement('script');
        signInJS.async = true;
        signInJS.src = src;
        signInJS.onload = onload;
        document.head.appendChild(signInJS);
    };
    return BaseLoginProvider;
}());
exports.BaseLoginProvider = BaseLoginProvider;
//# sourceMappingURL=base-login-provider.class.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocialAuthServiceConfig = /** @class */ (function () {
    function SocialAuthServiceConfig(providers) {
        this.providers = new Map();
        for (var i = 0; i < providers.length; i++) {
            var element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
    return SocialAuthServiceConfig;
}());
exports.SocialAuthServiceConfig = SocialAuthServiceConfig;
//# sourceMappingURL=social-auth-service-config.class.js.map
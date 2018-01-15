"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
exports.Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return common_1.ReflectMetadata('roles', roles);
};
//# sourceMappingURL=roles.decorator.js.map
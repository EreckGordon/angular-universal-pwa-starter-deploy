"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAuthenticatedMiddleware = function (req, res, next) {
    if (req['user']) {
        next();
    }
    else {
        res.sendStatus(403);
    }
};
//# sourceMappingURL=check-if-authenticated.middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCSRFTokenMiddleware = function (req, res, next) {
    var csrfCookie = req.cookies["XSRF-TOKEN"];
    var csrfHeader = req.headers['x-xsrf-token'];
    if (csrfCookie && csrfHeader && csrfCookie === csrfHeader) {
        next();
    }
    else {
        res.sendStatus(403);
    }
};
//# sourceMappingURL=check-csrf-token.middleware.js.map
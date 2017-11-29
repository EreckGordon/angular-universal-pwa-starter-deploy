"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAuthenticatedMiddleware = (req, res, next) => {
    if (req['user']) {
        next();
    }
    else {
        res.sendStatus(403);
    }
};

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const security_service_1 = require("../security/security.service");
const auth_service_1 = require("../../auth/auth.service");
let RetrieveUserIdFromRequestMiddleware = class RetrieveUserIdFromRequestMiddleware {
    constructor(securityService, authService) {
        this.securityService = securityService;
        this.authService = authService;
        this.useSecure = process.env.SESSION_ID_SECURE_COOKIE === 'true';
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const jwt = req.cookies['SESSIONID'];
                if (jwt) {
                    try {
                        const payload = yield this.securityService.decodeJwt(jwt);
                        if (payload.exp * 1000 - Date.now() < 1) {
                            const canCreateNewSession = yield this.securityService.checkRefreshToken(payload.refreshToken, payload.sub);
                            if (!canCreateNewSession) {
                                console.log(`create new session check failed.
                                refresh token too old or removed from db.
                                removing their authorizing cookies.`);
                                res.clearCookie('SESSIONID');
                                res.clearCookie('XSRF-TOKEN');
                                return res.sendStatus(403);
                            }
                            const sessionToken = yield this.securityService.createSessionToken({
                                roles: payload.roles,
                                id: payload.sub,
                                loginProvider: payload.loginProvider,
                                refreshToken: payload.refreshToken,
                            });
                            res.cookie('SESSIONID', sessionToken, {
                                httpOnly: true,
                                secure: this.useSecure,
                            });
                            req['user'] = yield this.securityService.decodeJwt(sessionToken);
                            return next();
                        }
                        req['user'] = payload;
                        next();
                    }
                    catch (err) {
                        console.log('Error: Could not extract user from request:', err.message);
                        next();
                    }
                }
                else {
                    next();
                }
            });
        });
    }
};
RetrieveUserIdFromRequestMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [security_service_1.SecurityService, auth_service_1.AuthService])
], RetrieveUserIdFromRequestMiddleware);
exports.RetrieveUserIdFromRequestMiddleware = RetrieveUserIdFromRequestMiddleware;

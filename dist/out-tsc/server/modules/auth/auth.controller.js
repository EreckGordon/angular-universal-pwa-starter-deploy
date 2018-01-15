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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var roles_guard_1 = require("../common/guards/roles.guard");
var roles_decorator_1 = require("../common/decorators/roles.decorator");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
        this.useSecure = process.env.SESSION_ID_SECURE_COOKIE === 'true';
    }
    AuthController.prototype.login = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var loginResult, _a, user, sessionToken, csrfToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.authService.loginEmailAndPasswordUser(body)];
                    case 1:
                        loginResult = _b.sent();
                        if (loginResult.apiCallResult) {
                            _a = loginResult.result, user = _a.user, sessionToken = _a.sessionToken, csrfToken = _a.csrfToken;
                            res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: this.useSecure });
                            res.cookie("XSRF-TOKEN", csrfToken);
                            res.status(200).json({ id: user.id, email: user.emailAndPasswordProvider.email, roles: user.roles });
                        }
                        else {
                            res.status(401).json(loginResult.result.error);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.createUser = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var createUserResult, _a, user, sessionToken, csrfToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.authService.createEmailAndPasswordUser(body)];
                    case 1:
                        createUserResult = _b.sent();
                        if (createUserResult.apiCallResult) {
                            _a = createUserResult.result, user = _a.user, sessionToken = _a.sessionToken, csrfToken = _a.csrfToken;
                            res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: this.useSecure });
                            res.cookie("XSRF-TOKEN", csrfToken);
                            res.status(200).json({ id: user.id, email: user.emailAndPasswordProvider.email, roles: user.roles });
                        }
                        else {
                            switch (createUserResult.result.error) {
                                case "Email already in use":
                                    res.status(409).json({ error: 'Email already in use' });
                                    break;
                                case "Error creating new user":
                                    res.sendStatus(500);
                                    break;
                                default:
                                    res.status(400).json(createUserResult.result.error);
                                    break;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.a = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AuthController.prototype.logout = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, res.clearCookie("SESSIONID")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, res.clearCookie("XSRF-TOKEN")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(200)];
                }
            });
        });
    };
    __decorate([
        common_1.Post('login-email-and-password-user'),
        __param(0, common_1.Res()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "login", null);
    __decorate([
        common_1.Post('create-email-and-password-user'),
        __param(0, common_1.Res()), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "createUser", null);
    __decorate([
        common_1.Post('logout'),
        roles_decorator_1.Roles('user'),
        __param(0, common_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "logout", null);
    AuthController = __decorate([
        common_1.Controller('auth'),
        common_1.UseGuards(roles_guard_1.RolesGuard),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
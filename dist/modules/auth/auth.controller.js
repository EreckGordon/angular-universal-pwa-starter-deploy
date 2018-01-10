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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.useSecure = process.env.SESSION_ID_SECURE_COOKIE === 'true';
    }
    loginEmailAndPasswordUser(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginResult = yield this.authService.loginEmailAndPasswordUser(body);
            if (loginResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, loginResult.result);
            }
            else {
                res.status(401).json(loginResult.result.error);
            }
        });
    }
    createEmailAndPasswordUser(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserResult = yield this.authService.createEmailAndPasswordUser(body);
            if (createUserResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, createUserResult.result);
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
        });
    }
    createAnonymousUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createAnonymousUserResult = yield this.authService.createAnonymousUser();
            if (createAnonymousUserResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, createAnonymousUserResult.result);
            }
            else {
                res.status(401).json(createAnonymousUserResult.result.error);
            }
        });
    }
    upgradeAnonymousUser(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const upgradeResult = yield this.authService.upgradeAnonymousUserToEmailAndPassword(req, body);
            if (upgradeResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, upgradeResult.result);
            }
            else {
                switch (upgradeResult.result.error) {
                    case "User is not anonymous":
                        res.status(409).json({ error: 'User is not anonymous' });
                        break;
                    default:
                        res.status(401).json(upgradeResult.result.error);
                        break;
                }
            }
        });
    }
    logout(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield res.clearCookie("SESSIONID");
            yield res.clearCookie("XSRF-TOKEN");
            return res.sendStatus(200);
        });
    }
    sendSuccessfulUserResult(res, authServiceResult) {
        const { user, sessionToken, csrfToken } = authServiceResult;
        res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: this.useSecure });
        res.cookie("XSRF-TOKEN", csrfToken);
        res.status(200).json({ id: user.id, isAnonymous: user.isAnonymous, roles: user.roles });
    }
};
__decorate([
    common_1.Post('login-email-and-password-user'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginEmailAndPasswordUser", null);
__decorate([
    common_1.Post('create-email-and-password-user'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createEmailAndPasswordUser", null);
__decorate([
    common_1.Post('create-anonymous-user'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createAnonymousUser", null);
__decorate([
    common_1.Patch('upgrade-anonymous-user-to-email-and-password'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "upgradeAnonymousUser", null);
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
exports.AuthController = AuthController;

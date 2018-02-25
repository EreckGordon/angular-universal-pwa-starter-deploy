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
const social_user_class_1 = require("../../../src/app/shared/auth/social-module/classes/social-user.class");
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
                this.sendSuccessfulUserResult(res, loginResult.result, 'emailAndPassword');
            }
            else {
                res.status(401).json(loginResult.result.error);
            }
        });
    }
    authenticateSocialUser(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticateSocialUserResult = yield this.authService.authenticateSocialUser(body);
            if (authenticateSocialUserResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, authenticateSocialUserResult.result, body.provider);
            }
            else {
                res.status(401).json(authenticateSocialUserResult.result.error);
            }
        });
    }
    createEmailAndPasswordUser(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserResult = yield this.authService.createEmailAndPasswordUser(body);
            if (createUserResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, createUserResult.result, 'emailAndPassword');
            }
            else {
                switch (createUserResult.result.error) {
                    case 'Email already in use':
                        res.status(409).json(createUserResult.result.error);
                        break;
                    case 'Error creating new user':
                        res.sendStatus(500);
                        break;
                    default:
                        res.status(401).json(createUserResult.result.error);
                        break;
                }
            }
        });
    }
    createAnonymousUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createAnonymousUserResult = yield this.authService.createAnonymousUser();
            if (createAnonymousUserResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, createAnonymousUserResult.result, 'anonymous');
            }
            else {
                res.status(401).json(createAnonymousUserResult.result.error);
            }
        });
    }
    upgradeAnonymousUserToEmailAndPassword(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield req['user']['sub'];
            const upgradeResult = yield this.authService.upgradeAnonymousUserToEmailAndPassword(userId, body);
            if (upgradeResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, upgradeResult.result, 'emailAndPassword');
            }
            else {
                switch (upgradeResult.result.error) {
                    case 'User is not anonymous':
                        res.status(409).json({ error: 'User is not anonymous' });
                        break;
                    default:
                        res.status(401).json(upgradeResult.result.error);
                        break;
                }
            }
        });
    }
    upgradeAnonymousUserToSocial(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield req['user']['sub'];
            const upgradeResult = yield this.authService.upgradeAnonymousUserToSocial(userId, body);
            if (upgradeResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, upgradeResult.result, body.provider);
            }
            else {
                switch (upgradeResult.result.error) {
                    case 'User is not anonymous':
                        res.status(409).json({ error: 'User is not anonymous' });
                        break;
                    default:
                        res.status(401).json(upgradeResult.result.error);
                        break;
                }
            }
        });
    }
    linkProviderToAccount(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield req['user']['sub'];
            const linkProviderToAccountResult = yield this.authService.linkProviderToAccount(userId, body);
            if (linkProviderToAccountResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, linkProviderToAccountResult.result, body.provider);
            }
            else {
                res.status(401).json(linkProviderToAccountResult.result.error);
            }
        });
    }
    requestPasswordReset(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestPasswordResetResult = yield this.authService.requestPasswordReset(body);
            if (requestPasswordResetResult.apiCallResult) {
                res.status(200).json({ result: 'password reset email sent' });
            }
            else {
                res.status(401).json(requestPasswordResetResult.result.error);
            }
        });
    }
    resetPassword(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetPasswordResult = yield this.authService.resetPassword(body);
            if (resetPasswordResult.apiCallResult) {
                this.sendSuccessfulUserResult(res, resetPasswordResult.result, 'emailAndPassword');
            }
            else {
                res.status(401).json(resetPasswordResult.result.error);
            }
        });
    }
    changePassword(req, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = yield req['user'];
            const changePasswordResult = yield this.authService.changePassword(body, jwt);
            if (changePasswordResult.apiCallResult) {
                res.status(200).json(changePasswordResult.result);
            }
            else {
                res.status(401).json(changePasswordResult.result.error);
            }
        });
    }
    reauthenticateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = yield req['user'];
            const reauthenticateResult = yield this.authService.reauthenticateUser(jwt);
            if (reauthenticateResult.apiCallResult) {
                this.sendUserDetails(reauthenticateResult.result.user, res, jwt['loginProvider']);
            }
            else {
                res.clearCookie('SESSIONID');
                yield res.clearCookie('XSRF-TOKEN');
                res.status(401).json(reauthenticateResult.result.error);
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = yield req['user'];
            const deleteAccountResult = yield this.authService.deleteAccount(jwt);
            if (deleteAccountResult.apiCallResult) {
                res.clearCookie('SESSIONID');
                yield res.clearCookie('XSRF-TOKEN');
                return res.status(200).json({ result: 'account permanently deleted' });
            }
            else {
                res.status(401).json(deleteAccountResult.result.error);
            }
        });
    }
    logout(res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('SESSIONID');
            yield res.clearCookie('XSRF-TOKEN');
            return res.status(200).json({ goodbye: 'come again soon' });
        });
    }
    sendSuccessfulUserResult(res, authServiceResult, loginProvider) {
        const { user, sessionToken, csrfToken } = authServiceResult;
        res.cookie('SESSIONID', sessionToken, {
            httpOnly: true,
            secure: this.useSecure,
        });
        res.cookie('XSRF-TOKEN', csrfToken);
        this.sendUserDetails(user, res, loginProvider);
    }
    sendUserDetails(user, res, loginProvider) {
        let email;
        try {
            switch (loginProvider) {
                case 'emailAndPassword':
                    email = user.emailAndPasswordProvider.email;
                    break;
                case 'google':
                    email = user.googleProvider.email;
                    break;
                case 'facebook':
                    email = user.facebookProvider.email;
                    break;
            }
        }
        catch (e) {
            email = null;
        }
        let authProviders = [];
        try {
            user.emailAndPasswordProviderId !== null ? authProviders.push('emailAndPassword') : null;
            user.facebookProviderId !== null ? authProviders.push('facebook') : null;
            user.googleProviderId !== null ? authProviders.push('google') : null;
        }
        catch (e) { }
        res.status(200).json({
            id: user.id,
            isAnonymous: user.isAnonymous,
            roles: user.roles,
            email,
            authProviders,
        });
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
    common_1.Post('authenticate-social-user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, social_user_class_1.SocialUser]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticateSocialUser", null);
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
], AuthController.prototype, "upgradeAnonymousUserToEmailAndPassword", null);
__decorate([
    common_1.Patch('upgrade-anonymous-user-to-social'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "upgradeAnonymousUserToSocial", null);
__decorate([
    common_1.Patch('link-provider-to-account'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "linkProviderToAccount", null);
__decorate([
    common_1.Post('request-password-reset'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    common_1.Post('reset-password'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Post('change-password'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    common_1.Post('reauthenticate'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reauthenticateUser", null);
__decorate([
    common_1.Post('delete-account'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
__decorate([
    common_1.Post('logout'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    common_1.Controller('api/auth'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;

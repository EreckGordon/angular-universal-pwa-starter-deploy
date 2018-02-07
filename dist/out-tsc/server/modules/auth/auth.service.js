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
var typeorm_1 = require("typeorm");
var email_and_password_service_1 = require("./email-and-password/email-and-password.service");
var anonymous_service_1 = require("./anonymous/anonymous.service");
var mailgun_service_1 = require("../common/mailgun.service");
var security_service_1 = require("../common/security/security.service");
var AuthService = (function () {
    function AuthService(emailAndPasswordService, anonymousService, userRepository, mailgunService, securityService) {
        this.emailAndPasswordService = emailAndPasswordService;
        this.anonymousService = anonymousService;
        this.userRepository = userRepository;
        this.mailgunService = mailgunService;
        this.securityService = securityService;
    }
    AuthService.prototype.loginEmailAndPasswordUser = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userExists, loginResult, result, error_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailAndPasswordService.findUserByEmail(body.email)];
                    case 1:
                        user = _a.sent();
                        userExists = user === undefined ? false : true;
                        if (!!userExists) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'user does not exist' },
                            }];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.emailAndPasswordService.loginAndCreateSession(body, user)];
                    case 3:
                        loginResult = _a.sent();
                        if (loginResult['message'] === 'Password Invalid')
                            throw new Error('Password Invalid');
                        result = {
                            apiCallResult: true,
                            result: {
                                user: user,
                                sessionToken: loginResult.sessionToken,
                                csrfToken: loginResult.csrfToken,
                            },
                        };
                        return [2 /*return*/, result];
                    case 4:
                        error_1 = _a.sent();
                        result = {
                            apiCallResult: false,
                            result: { error: 'Password Invalid' },
                        };
                        return [2 /*return*/, result];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyEmailAndPasswordValidity = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameTaken, result, passwordErrors, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailAndPasswordService.emailTaken(body.email)];
                    case 1:
                        usernameTaken = _a.sent();
                        if (usernameTaken) {
                            result = {
                                apiCallResult: false,
                                result: { error: 'Email already in use' },
                            };
                            return [2 /*return*/, result];
                        }
                        passwordErrors = this.emailAndPasswordService.validatePassword(body.password);
                        if (passwordErrors.length > 0) {
                            result = {
                                apiCallResult: false,
                                result: { error: passwordErrors },
                            };
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, 'success'];
                }
            });
        });
    };
    AuthService.prototype.createEmailAndPasswordUser = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyResult, createUserResult, result, e_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyEmailAndPasswordValidity(body)];
                    case 1:
                        verifyResult = _a.sent();
                        if (!(verifyResult !== 'success')) return [3 /*break*/, 2];
                        return [2 /*return*/, verifyResult];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.emailAndPasswordService.createEmailAndPasswordUserAndSession(body)];
                    case 3:
                        createUserResult = _a.sent();
                        result = {
                            apiCallResult: true,
                            result: {
                                user: createUserResult.user,
                                sessionToken: createUserResult.sessionToken,
                                csrfToken: createUserResult.csrfToken,
                            },
                        };
                        return [2 /*return*/, result];
                    case 4:
                        e_1 = _a.sent();
                        result = {
                            apiCallResult: false,
                            result: {
                                error: 'Error creating new email and password user',
                            },
                        };
                        return [2 /*return*/, result];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.createAnonymousUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createAnonymousUserResult, result, e_2, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.anonymousService.createAnonymousUserAndSession()];
                    case 1:
                        createAnonymousUserResult = _a.sent();
                        result = {
                            apiCallResult: true,
                            result: {
                                user: createAnonymousUserResult.user,
                                sessionToken: createAnonymousUserResult.sessionToken,
                                csrfToken: createAnonymousUserResult.csrfToken,
                            },
                        };
                        return [2 /*return*/, result];
                    case 2:
                        e_2 = _a.sent();
                        result = {
                            apiCallResult: false,
                            result: { error: 'Error creating new anonymous user' },
                        };
                        return [2 /*return*/, result];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.upgradeAnonymousUserToEmailAndPassword = function (req, body) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyResult, userId, upgradeAnonymousUserToEmailAndPasswordResult, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyEmailAndPasswordValidity(body)];
                    case 1:
                        verifyResult = _a.sent();
                        if (!(verifyResult !== 'success')) return [3 /*break*/, 2];
                        return [2 /*return*/, verifyResult];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        userId = req['user']['sub'];
                        return [4 /*yield*/, this.emailAndPasswordService.upgradeAnonymousUserToEmailAndPassword({ email: body.email, password: body.password, userId: userId })];
                    case 3:
                        upgradeAnonymousUserToEmailAndPasswordResult = _a.sent();
                        if (upgradeAnonymousUserToEmailAndPasswordResult['message'] ===
                            'User is not anonymous')
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: 'User is not anonymous' },
                                }];
                        result = {
                            apiCallResult: true,
                            result: {
                                user: upgradeAnonymousUserToEmailAndPasswordResult.user,
                                sessionToken: upgradeAnonymousUserToEmailAndPasswordResult.sessionToken,
                                csrfToken: upgradeAnonymousUserToEmailAndPasswordResult.csrfToken,
                            },
                        };
                        return [2 /*return*/, result];
                    case 4:
                        e_3 = _a.sent();
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'Not logged in' },
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.findUserByUuid = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(uuid)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.reauthenticateUser = function (jwt) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, emailProvider, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.findUserByUuid(jwt['sub'])];
                    case 1:
                        user = _b.sent();
                        if (user.isAnonymous) {
                            return [2 /*return*/, { apiCallResult: true, result: { user: user } }];
                        }
                        _a = jwt['loginProvider'];
                        switch (_a) {
                            case 'emailAndPassword': return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId)];
                    case 3:
                        emailProvider = _b.sent();
                        user.emailAndPasswordProvider = emailProvider;
                        return [2 /*return*/, { apiCallResult: true, result: { user: user } }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_4 = _b.sent();
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'could not reauthenticate' },
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.requestPasswordReset = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var user, userExists, token, emailAndPasswordProvider, passwordResetEmail, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.emailAndPasswordService.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        userExists = user === undefined ? false : true;
                        if (!userExists)
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: 'user does not exist' },
                                }];
                        return [4 /*yield*/, this.securityService.createPasswordResetToken(email)];
                    case 2:
                        token = _a.sent();
                        return [4 /*yield*/, this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId)];
                    case 3:
                        emailAndPasswordProvider = _a.sent();
                        user.emailAndPasswordProvider = emailAndPasswordProvider;
                        user.emailAndPasswordProvider.passwordResetToken = token;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.mailgunService.sendPasswordResetEmail({
                                email: email,
                                token: token,
                            })];
                    case 5:
                        passwordResetEmail = _a.sent();
                        return [2 /*return*/, { apiCallResult: true, result: {} }];
                    case 6:
                        e_5 = _a.sent();
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'error requesting password reset' },
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (_a) {
        var password = _a.password, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var decodedTokenOrError, emailAndPasswordProvider, passwordErrors, passwordHash, user, sessionToken, csrfToken, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.securityService.decodePasswordResetToken(token)];
                    case 1:
                        decodedTokenOrError = _a.sent();
                        if (decodedTokenOrError === 'jwt expired')
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: 'jwt expired' },
                                }];
                        return [4 /*yield*/, this.emailAndPasswordService.findEmailAndPasswordProviderByEmail(decodedTokenOrError.email)];
                    case 2:
                        emailAndPasswordProvider = _a.sent();
                        if (token !== emailAndPasswordProvider.passwordResetToken)
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: 'jwt does not match database' },
                                }];
                        emailAndPasswordProvider.passwordResetToken = null;
                        passwordErrors = this.emailAndPasswordService.validatePassword(password);
                        if (passwordErrors.length > 0)
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: passwordErrors },
                                }];
                        return [4 /*yield*/, this.securityService.createPasswordHash({
                                password: password,
                            })];
                    case 3:
                        passwordHash = _a.sent();
                        emailAndPasswordProvider.passwordHash = passwordHash;
                        return [4 /*yield*/, this.emailAndPasswordService.findUserAccountByEmailAndPasswordProviderId(emailAndPasswordProvider.id)];
                    case 4:
                        user = _a.sent();
                        user.emailAndPasswordProvider = emailAndPasswordProvider;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.securityService.createSessionToken({
                                roles: user.roles,
                                id: user.id,
                                loginProvider: 'emailAndPassword',
                            })];
                    case 6:
                        sessionToken = _a.sent();
                        return [4 /*yield*/, this.securityService.createCsrfToken()];
                    case 7:
                        csrfToken = _a.sent();
                        return [2 /*return*/, {
                                apiCallResult: true,
                                result: { user: user, sessionToken: sessionToken, csrfToken: csrfToken },
                            }];
                    case 8:
                        e_6 = _a.sent();
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'error resetting password' },
                            }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.changePassword = function (body, jwt) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailAndPasswordProvider, isPasswordValid, passwordErrors, newPasswordHash, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.userRepository.findOne(jwt.sub)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId)];
                    case 2:
                        emailAndPasswordProvider = _a.sent();
                        return [4 /*yield*/, this.securityService.verifyPasswordHash({
                                passwordHash: emailAndPasswordProvider.passwordHash,
                                password: body.oldPassword,
                            })];
                    case 3:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid)
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: 'Password Invalid' },
                                }];
                        passwordErrors = this.emailAndPasswordService.validatePassword(body.newPassword);
                        if (passwordErrors.length > 0)
                            return [2 /*return*/, {
                                    apiCallResult: false,
                                    result: { error: passwordErrors },
                                }];
                        return [4 /*yield*/, this.securityService.createPasswordHash({
                                password: body.newPassword,
                            })];
                    case 4:
                        newPasswordHash = _a.sent();
                        emailAndPasswordProvider.passwordHash = newPasswordHash;
                        return [4 /*yield*/, this.emailAndPasswordService.updateEmailAndPasswordProvider(emailAndPasswordProvider)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { apiCallResult: true, result: {} }];
                    case 6:
                        e_7 = _a.sent();
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'error changing password' },
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.deleteAccount = function (jwt) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var userToBeDeleted_1, providerToBeDeleted, _a, _b, e_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne(jwt.sub)];
                    case 1:
                        userToBeDeleted_1 = _c.sent();
                        providerToBeDeleted = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = jwt.loginProvider;
                                        switch (_a) {
                                            case 'emailAndPassword': return [3 /*break*/, 1];
                                        }
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this.emailAndPasswordService.findEmailAndPasswordProviderById(userToBeDeleted_1.emailAndPasswordProviderId)];
                                    case 2: return [2 /*return*/, _b.sent()];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, this.userRepository.remove(userToBeDeleted_1)];
                    case 2:
                        _c.sent();
                        _b = (_a = this.emailAndPasswordService).removeEmailAndPasswordProvider;
                        return [4 /*yield*/, providerToBeDeleted()];
                    case 3: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, { apiCallResult: true, result: {} }];
                    case 5:
                        e_8 = _c.sent();
                        return [2 /*return*/, {
                                apiCallResult: false,
                                result: { error: 'error deleting account' },
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Component(),
        __param(2, common_1.Inject('UserRepositoryToken')),
        __metadata("design:paramtypes", [email_and_password_service_1.EmailAndPasswordService,
            anonymous_service_1.AnonymousService,
            typeorm_1.Repository,
            mailgun_service_1.MailgunService,
            security_service_1.SecurityService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
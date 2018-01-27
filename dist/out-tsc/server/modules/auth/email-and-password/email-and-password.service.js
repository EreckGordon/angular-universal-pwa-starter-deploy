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
var user_entity_1 = require("../user.entity");
var email_and_password_provider_entity_1 = require("./email-and-password-provider.entity");
var security_service_1 = require("../../common/security/security.service");
var passwordValidator = require("password-validator");
var EmailAndPasswordService = /** @class */ (function () {
    function EmailAndPasswordService(userRepository, emailAndPasswordProviderRepository, securityService) {
        this.userRepository = userRepository;
        this.emailAndPasswordProviderRepository = emailAndPasswordProviderRepository;
        this.securityService = securityService;
    }
    EmailAndPasswordService.prototype.findUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var currentProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findEmailAndPasswordProviderByEmail(email)];
                    case 1:
                        currentProvider = _a.sent();
                        if (currentProvider === undefined)
                            return [2 /*return*/, Promise.resolve(undefined)];
                        return [2 /*return*/, this.findUserAccountByEmailAndPasswordProviderId(currentProvider.id)];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.findEmailAndPasswordProviderById = function (providerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailAndPasswordProviderRepository.findOne({
                            where: { id: providerId },
                            cache: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.findEmailAndPasswordProviderByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailAndPasswordProviderRepository.findOne({
                            where: { email: email }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.findUserAccountByEmailAndPasswordProviderId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { emailAndPasswordProviderId: id },
                            relations: ["emailAndPasswordProvider"],
                            cache: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.emailTaken = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUserByEmail(email)];
                    case 1: return [2 /*return*/, (_a.sent()) === undefined ? false : true];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.addEmailAndPasswordUserToDatabase = function (email, passwordHash) {
        return __awaiter(this, void 0, void 0, function () {
            var emailAndPasswordProvider, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailAndPasswordProvider = new email_and_password_provider_entity_1.EmailAndPasswordProvider();
                        emailAndPasswordProvider.email = email;
                        emailAndPasswordProvider.passwordHash = passwordHash;
                        user = new user_entity_1.User();
                        user.isAnonymous = false;
                        user.roles = ['user'];
                        user.emailAndPasswordProvider = emailAndPasswordProvider;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.createEmailAndPasswordUserAndSession = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash, user, sessionToken, csrfToken, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.securityService.createPasswordHash({ password: credentials.password })];
                    case 1:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, this.addEmailAndPasswordUserToDatabase(credentials.email, passwordHash)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.securityService.createSessionToken({ roles: user.roles, id: user.id.toString(), loginProvider: 'emailAndPassword' })];
                    case 3:
                        sessionToken = _a.sent();
                        return [4 /*yield*/, this.securityService.createCsrfToken()];
                    case 4:
                        csrfToken = _a.sent();
                        result = { user: user, sessionToken: sessionToken, csrfToken: csrfToken };
                        return [2 /*return*/, result];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.loginAndCreateSession = function (credentials, user) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionToken, csrfToken, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.attemptLoginWithEmailAndPassword(credentials, user)];
                    case 1:
                        sessionToken = _a.sent();
                        return [4 /*yield*/, this.securityService.createCsrfToken()];
                    case 2:
                        csrfToken = _a.sent();
                        result = { sessionToken: sessionToken, csrfToken: csrfToken };
                        return [2 /*return*/, result];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, err_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.attemptLoginWithEmailAndPassword = function (credentials, user) {
        return __awaiter(this, void 0, void 0, function () {
            var emailProvider, isPasswordValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId)];
                    case 1:
                        emailProvider = _a.sent();
                        return [4 /*yield*/, this.securityService.verifyPasswordHash({ passwordHash: emailProvider.passwordHash, password: credentials.password })];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) {
                            throw new Error("Password Invalid");
                        }
                        return [2 /*return*/, this.securityService.createSessionToken({ roles: user.roles, id: user.id, loginProvider: 'emailAndPassword' })];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.upgradeAnonymousUserToEmailAndPassword = function (_a) {
        var email = _a.email, password = _a.password, userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash, user, sessionToken, csrfToken, result, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.securityService.createPasswordHash({ password: password })];
                    case 1:
                        passwordHash = _b.sent();
                        return [4 /*yield*/, this.upgradeAnonymousUserInDatabase({ email: email, passwordHash: passwordHash, userId: userId })];
                    case 2:
                        user = _b.sent();
                        return [4 /*yield*/, this.securityService.createSessionToken({ roles: user.roles, id: user.id, loginProvider: 'emailAndPassword' })];
                    case 3:
                        sessionToken = _b.sent();
                        return [4 /*yield*/, this.securityService.createCsrfToken()];
                    case 4:
                        csrfToken = _b.sent();
                        result = { user: user, sessionToken: sessionToken, csrfToken: csrfToken };
                        return [2 /*return*/, result];
                    case 5:
                        err_3 = _b.sent();
                        return [2 /*return*/, err_3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.upgradeAnonymousUserInDatabase = function (_a) {
        var email = _a.email, passwordHash = _a.passwordHash, userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var user, emailAndPasswordProvider;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(userId)];
                    case 1:
                        user = _b.sent();
                        if (!user.isAnonymous)
                            throw new Error('User is not anonymous');
                        emailAndPasswordProvider = new email_and_password_provider_entity_1.EmailAndPasswordProvider();
                        emailAndPasswordProvider.email = email;
                        emailAndPasswordProvider.passwordHash = passwordHash;
                        user.isAnonymous = false;
                        user.roles = ['user'];
                        user.emailAndPasswordProvider = emailAndPasswordProvider;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    EmailAndPasswordService.prototype.validatePassword = function (password) {
        var schema = new passwordValidator();
        schema
            .is().min(10)
            .is().not().oneOf(['Passw0rd', 'Password123']);
        return schema.validate(password, { list: true });
    };
    EmailAndPasswordService = __decorate([
        common_1.Component(),
        __param(0, common_1.Inject('UserRepositoryToken')),
        __param(1, common_1.Inject('EmailAndPasswordProviderRepositoryToken')),
        __metadata("design:paramtypes", [typeorm_1.Repository,
            typeorm_1.Repository,
            security_service_1.SecurityService])
    ], EmailAndPasswordService);
    return EmailAndPasswordService;
}());
exports.EmailAndPasswordService = EmailAndPasswordService;
//# sourceMappingURL=email-and-password.service.js.map
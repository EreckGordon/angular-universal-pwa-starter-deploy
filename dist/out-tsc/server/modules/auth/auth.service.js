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
var user_entity_1 = require("./user.entity");
var email_and_password_provider_entity_1 = require("./email-and-password-provider.entity");
var util = require('util');
var fs = require("fs");
var path = require("path");
var crypto = require('crypto');
var argon2 = require("argon2");
var jwt = require("jsonwebtoken");
var passwordValidator = require("password-validator");
var randomBytes = util.promisify(crypto.randomBytes);
var signJwt = util.promisify(jwt.sign);
var RSA_PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), 'private.key'));
var RSA_PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), 'public.key'));
var AuthService = /** @class */ (function () {
    function AuthService(userRepository, emailAndPasswordProviderRepository) {
        this.userRepository = userRepository;
        this.emailAndPasswordProviderRepository = emailAndPasswordProviderRepository;
    }
    AuthService.prototype.loginEmailAndPasswordUser = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, user, userExists, result, loginResult, result, error_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = body;
                        return [4 /*yield*/, this.findUserByEmail(credentials.email)];
                    case 1:
                        user = _a.sent();
                        userExists = user === undefined ? false : true;
                        if (!!userExists) return [3 /*break*/, 2];
                        result = { apiCallResult: false, result: { error: 'user does not exist' } };
                        return [2 /*return*/, result];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.loginAndCreateSession(credentials, user)];
                    case 3:
                        loginResult = _a.sent();
                        if (loginResult["message"] === "Password Invalid")
                            throw new Error("Password Invalid");
                        result = {
                            apiCallResult: true,
                            result: {
                                user: user,
                                sessionToken: loginResult.sessionToken,
                                csrfToken: loginResult.csrfToken
                            }
                        };
                        return [2 /*return*/, result];
                    case 4:
                        error_1 = _a.sent();
                        result = { apiCallResult: false, result: { error: "Password Invalid" } };
                        return [2 /*return*/, result];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.createEmailAndPasswordUser = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, usernameTaken, result, passwordErrors, result, createUserResult, result, e_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = body;
                        return [4 /*yield*/, this.emailTaken(credentials.email)];
                    case 1:
                        usernameTaken = _a.sent();
                        if (usernameTaken) {
                            result = { apiCallResult: false, result: { error: 'Email already in use' } };
                            return [2 /*return*/, result];
                        }
                        passwordErrors = this.validatePassword(credentials.password);
                        if (!(passwordErrors.length > 0)) return [3 /*break*/, 2];
                        result = { apiCallResult: false, result: { error: passwordErrors } };
                        return [2 /*return*/, result];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.createEmailAndPasswordUserAndSession(credentials)];
                    case 3:
                        createUserResult = _a.sent();
                        result = {
                            apiCallResult: true,
                            result: {
                                user: createUserResult.user,
                                sessionToken: createUserResult.sessionToken,
                                csrfToken: createUserResult.csrfToken
                            }
                        };
                        return [2 /*return*/, result];
                    case 4:
                        e_1 = _a.sent();
                        result = { apiCallResult: false, result: { error: 'Error creating new user' } };
                        return [2 /*return*/, result];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AuthService.prototype, "publicRSAKey", {
        get: function () {
            return RSA_PUBLIC_KEY;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.findUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var currentProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailAndPasswordProviderRepository.findOne({
                            where: { email: email },
                            cache: true // default 1000 = 1 second
                        })];
                    case 1:
                        currentProvider = _a.sent();
                        if (currentProvider === undefined)
                            return [2 /*return*/, Promise.resolve(undefined)];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { emailAndPasswordProviderId: currentProvider.id },
                                relations: ["emailAndPasswordProvider"],
                                cache: true
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.emailTaken = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUserByEmail(email)];
                    case 1: return [2 /*return*/, (_a.sent()) === undefined ? false : true];
                }
            });
        });
    };
    AuthService.prototype.addEmailAndPasswordUserToDatabase = function (email, passwordHash) {
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
    AuthService.prototype.createEmailAndPasswordUserAndSession = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash, user, sessionToken, csrfToken, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, argon2.hash(credentials.password)];
                    case 1:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, this.addEmailAndPasswordUserToDatabase(credentials.email, passwordHash)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.createSessionToken(user)];
                    case 3:
                        sessionToken = _a.sent();
                        return [4 /*yield*/, this.createCsrfToken()];
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
    AuthService.prototype.loginAndCreateSession = function (credentials, user) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionToken, csrfToken, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.attemptLoginWithEmailAndPassword(credentials, user)];
                    case 1:
                        sessionToken = _a.sent();
                        return [4 /*yield*/, this.createCsrfToken()];
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
    AuthService.prototype.findEmailProviderById = function (providerId) {
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
    AuthService.prototype.attemptLoginWithEmailAndPassword = function (credentials, user) {
        return __awaiter(this, void 0, void 0, function () {
            var emailProvider, isPasswordValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findEmailProviderById(user.emailAndPasswordProviderId)];
                    case 1:
                        emailProvider = _a.sent();
                        return [4 /*yield*/, argon2.verify(emailProvider.passwordHash, credentials.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) {
                            throw new Error("Password Invalid");
                        }
                        return [2 /*return*/, this.createSessionToken(user)];
                }
            });
        });
    };
    AuthService.prototype.createCsrfToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, randomBytes(32).then(function (bytes) { return bytes.toString("hex"); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.createSessionToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, signJwt({
                            roles: user.roles
                        }, RSA_PRIVATE_KEY, {
                            algorithm: 'RS256',
                            expiresIn: '2h',
                            subject: user.id.toString()
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.decodeJwt = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jwt.verify(token, RSA_PUBLIC_KEY)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    AuthService.prototype.validatePassword = function (password) {
        var schema = new passwordValidator();
        schema
            .is().min(10)
            .is().not().oneOf(['Passw0rd', 'Password123']);
        return schema.validate(password, { list: true });
    };
    AuthService = __decorate([
        common_1.Component(),
        __param(0, common_1.Inject('UserRepositoryToken')),
        __param(1, common_1.Inject('EmailAndPasswordProviderRepositoryToken')),
        __metadata("design:paramtypes", [typeorm_1.Repository,
            typeorm_1.Repository])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const util = require('util');
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
const randomBytes = util.promisify(crypto.randomBytes);
const signJwt = util.promisify(jwt.sign);
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), 'private.key'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), 'public.key'));
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = body;
            const user = yield this.findUserByEmail(credentials.email);
            const userExists = user === undefined ? false : true;
            if (!userExists) {
                const result = { apiCallResult: false, result: { error: 'user does not exist' } };
                return result;
            }
            else {
                try {
                    const loginResult = yield this.loginAndCreateSession(credentials, user);
                    if (loginResult["message"] === "Password Invalid")
                        throw new Error("Password Invalid");
                    const result = {
                        apiCallResult: true,
                        result: {
                            user,
                            sessionToken: loginResult.sessionToken,
                            csrfToken: loginResult.csrfToken
                        }
                    };
                    return result;
                }
                catch (error) {
                    const result = { apiCallResult: false, result: { error: "Password Invalid" } };
                    return result;
                }
            }
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = body;
            const usernameTaken = yield this.emailTaken(credentials.email);
            if (usernameTaken) {
                const result = { apiCallResult: false, result: { error: 'Email already in use' } };
                return result;
            }
            const passwordErrors = this.validatePassword(credentials.password);
            if (passwordErrors.length > 0) {
                const result = { apiCallResult: false, result: { error: passwordErrors } };
                return result;
            }
            else {
                try {
                    const createUserResult = yield this.createUserAndSession(credentials);
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: createUserResult.user,
                            sessionToken: createUserResult.sessionToken,
                            csrfToken: createUserResult.csrfToken
                        }
                    };
                    return result;
                }
                catch (e) {
                    const result = { apiCallResult: false, result: { error: 'Error creating new user' } };
                    return result;
                }
            }
        });
    }
    get publicRSAKey() {
        return RSA_PUBLIC_KEY;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ email });
        });
    }
    emailTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.findUserByEmail(email)) === undefined ? false : true;
        });
    }
    addUserToDatabase(email, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_entity_1.User();
            user.email = email;
            user.passwordHash = passwordHash;
            user.roles = ['user'];
            return yield this.userRepository.save(user);
        });
    }
    createUserAndSession(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield argon2.hash(credentials.password);
                const user = yield this.addUserToDatabase(credentials.email, passwordHash);
                const sessionToken = yield this.createSessionToken(user);
                const csrfToken = yield this.createCsrfToken();
                const result = { user, sessionToken, csrfToken };
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    loginAndCreateSession(credentials, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionToken = yield this.attemptLogin(credentials, user);
                const csrfToken = yield this.createCsrfToken();
                const result = { sessionToken, csrfToken };
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    attemptLogin(credentials, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordValid = yield argon2.verify(user.passwordHash, credentials.password);
            if (!isPasswordValid) {
                throw new Error("Password Invalid");
            }
            return this.createSessionToken(user);
        });
    }
    createCsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield randomBytes(32).then(bytes => bytes.toString("hex"));
        });
    }
    createSessionToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield signJwt({
                roles: user.roles
            }, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '2h',
                subject: user.id.toString()
            });
        });
    }
    decodeJwt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield jwt.verify(token, RSA_PUBLIC_KEY);
            return payload;
        });
    }
    validatePassword(password) {
        const schema = new passwordValidator();
        schema
            .is().min(10)
            .is().not().oneOf(['Passw0rd', 'Password123']);
        return schema.validate(password, { list: true });
    }
};
AuthService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;

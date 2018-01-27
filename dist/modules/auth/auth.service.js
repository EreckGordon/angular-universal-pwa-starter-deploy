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
const email_and_password_service_1 = require("./email-and-password/email-and-password.service");
const anonymous_service_1 = require("./anonymous/anonymous.service");
const mailgun_service_1 = require("../common/mailgun.service");
const security_service_1 = require("../common/security/security.service");
let AuthService = class AuthService {
    constructor(emailAndPasswordService, anonymousService, userRepository, mailgunService, securityService) {
        this.emailAndPasswordService = emailAndPasswordService;
        this.anonymousService = anonymousService;
        this.userRepository = userRepository;
        this.mailgunService = mailgunService;
        this.securityService = securityService;
    }
    loginEmailAndPasswordUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.emailAndPasswordService.findUserByEmail(body.email);
            const userExists = user === undefined ? false : true;
            if (!userExists) {
                return { apiCallResult: false, result: { error: 'user does not exist' } };
            }
            else {
                try {
                    const loginResult = yield this.emailAndPasswordService.loginAndCreateSession(body, user);
                    if (loginResult["message"] === 'Password Invalid')
                        throw new Error('Password Invalid');
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
                    const result = { apiCallResult: false, result: { error: 'Password Invalid' } };
                    return result;
                }
            }
        });
    }
    verifyEmailAndPasswordValidity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameTaken = yield this.emailAndPasswordService.emailTaken(body.email);
            if (usernameTaken) {
                const result = { apiCallResult: false, result: { error: 'Email already in use' } };
                return result;
            }
            const passwordErrors = this.emailAndPasswordService.validatePassword(body.password);
            if (passwordErrors.length > 0) {
                const result = { apiCallResult: false, result: { error: passwordErrors } };
                return result;
            }
            return 'success';
        });
    }
    createEmailAndPasswordUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyResult = yield this.verifyEmailAndPasswordValidity(body);
            if (verifyResult !== 'success')
                return verifyResult;
            else {
                try {
                    const createUserResult = yield this.emailAndPasswordService.createEmailAndPasswordUserAndSession(body);
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
                    const result = { apiCallResult: false, result: { error: 'Error creating new email and password user' } };
                    return result;
                }
            }
        });
    }
    createAnonymousUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createAnonymousUserResult = yield this.anonymousService.createAnonymousUserAndSession();
                const result = {
                    apiCallResult: true,
                    result: {
                        user: createAnonymousUserResult.user,
                        sessionToken: createAnonymousUserResult.sessionToken,
                        csrfToken: createAnonymousUserResult.csrfToken
                    }
                };
                return result;
            }
            catch (e) {
                const result = { apiCallResult: false, result: { error: 'Error creating new anonymous user' } };
                return result;
            }
        });
    }
    upgradeAnonymousUserToEmailAndPassword(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyResult = yield this.verifyEmailAndPasswordValidity(body);
            if (verifyResult !== 'success')
                return verifyResult;
            else {
                try {
                    const userId = req["user"]["sub"];
                    const upgradeAnonymousUserToEmailAndPasswordResult = yield this.emailAndPasswordService.upgradeAnonymousUserToEmailAndPassword({ email: body.email, password: body.password, userId });
                    if (upgradeAnonymousUserToEmailAndPasswordResult["message"] === 'User is not anonymous')
                        return { apiCallResult: false, result: { error: 'User is not anonymous' } };
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: upgradeAnonymousUserToEmailAndPasswordResult.user,
                            sessionToken: upgradeAnonymousUserToEmailAndPasswordResult.sessionToken,
                            csrfToken: upgradeAnonymousUserToEmailAndPasswordResult.csrfToken
                        }
                    };
                    return result;
                }
                catch (e) {
                    return { apiCallResult: false, result: { error: 'Not logged in' } };
                }
            }
        });
    }
    findUserByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne(uuid);
        });
    }
    reauthenticateUser(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findUserByUuid(jwt["sub"]);
                if (user.isAnonymous) {
                    return { apiCallResult: true, result: { user } };
                }
                switch (jwt["loginProvider"]) {
                    case "emailAndPassword":
                        const emailProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId);
                        user.emailAndPasswordProvider = emailProvider;
                        return { apiCallResult: true, result: { user } };
                }
            }
            catch (e) {
                return { apiCallResult: false, result: { error: 'could not reauthenticate' } };
            }
        });
    }
    requestPasswordReset({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.emailAndPasswordService.findUserByEmail(email);
                const userExists = user === undefined ? false : true;
                if (!userExists)
                    return { apiCallResult: false, result: { error: 'user does not exist' } };
                const token = yield this.securityService.createPasswordResetToken();
                const emailAndPasswordProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId);
                user.emailAndPasswordProvider = emailAndPasswordProvider;
                user.emailAndPasswordProvider.passwordResetToken = token;
                yield this.userRepository.save(user);
                const passwordResetEmail = yield this.mailgunService.sendPasswordResetEmail({ email, token });
                return { apiCallResult: true, result: {} };
            }
            catch (e) {
                return { apiCallResult: false, result: { error: 'error requesting password reset' } };
            }
        });
    }
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
exports.AuthService = AuthService;

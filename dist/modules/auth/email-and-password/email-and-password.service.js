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
const user_entity_1 = require("../user.entity");
const email_and_password_provider_entity_1 = require("./email-and-password-provider.entity");
const security_service_1 = require("../../common/security/security.service");
const passwordValidator = require("password-validator");
let EmailAndPasswordService = class EmailAndPasswordService {
    constructor(userRepository, emailAndPasswordProviderRepository, securityService) {
        this.userRepository = userRepository;
        this.emailAndPasswordProviderRepository = emailAndPasswordProviderRepository;
        this.securityService = securityService;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentProvider = yield this.findEmailAndPasswordProviderByEmail(email);
            if (currentProvider === undefined)
                return Promise.resolve(undefined);
            return this.findUserAccountByEmailAndPasswordProviderId(currentProvider.id);
        });
    }
    findEmailAndPasswordProviderById(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.emailAndPasswordProviderRepository.findOne({
                where: { id: providerId },
                cache: true
            });
        });
    }
    findEmailAndPasswordProviderByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.emailAndPasswordProviderRepository.findOne({
                where: { email }
            });
        });
    }
    findUserAccountByEmailAndPasswordProviderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({
                where: { emailAndPasswordProviderId: id },
                relations: ["emailAndPasswordProvider"],
                cache: true
            });
        });
    }
    emailTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.findUserByEmail(email)) === undefined ? false : true;
        });
    }
    addEmailAndPasswordUserToDatabase(email, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailAndPasswordProvider = new email_and_password_provider_entity_1.EmailAndPasswordProvider();
            emailAndPasswordProvider.email = email;
            emailAndPasswordProvider.passwordHash = passwordHash;
            const user = new user_entity_1.User();
            user.isAnonymous = false;
            user.roles = ['user'];
            user.emailAndPasswordProvider = emailAndPasswordProvider;
            return yield this.userRepository.save(user);
        });
    }
    createEmailAndPasswordUserAndSession(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield this.securityService.createPasswordHash({ password: credentials.password });
                const user = yield this.addEmailAndPasswordUserToDatabase(credentials.email, passwordHash);
                const sessionToken = yield this.securityService.createSessionToken({ roles: user.roles, id: user.id.toString(), loginProvider: 'emailAndPassword' });
                const csrfToken = yield this.securityService.createCsrfToken();
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
                const sessionToken = yield this.attemptLoginWithEmailAndPassword(credentials, user);
                const csrfToken = yield this.securityService.createCsrfToken();
                const result = { sessionToken, csrfToken };
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    attemptLoginWithEmailAndPassword(credentials, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailProvider = yield this.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId);
            const isPasswordValid = yield this.securityService.verifyPasswordHash({ passwordHash: emailProvider.passwordHash, password: credentials.password });
            if (!isPasswordValid) {
                throw new Error("Password Invalid");
            }
            return this.securityService.createSessionToken({ roles: user.roles, id: user.id, loginProvider: 'emailAndPassword' });
        });
    }
    upgradeAnonymousUserToEmailAndPassword({ email, password, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield this.securityService.createPasswordHash({ password });
                const user = yield this.upgradeAnonymousUserInDatabase({ email, passwordHash, userId });
                const sessionToken = yield this.securityService.createSessionToken({ roles: user.roles, id: user.id, loginProvider: 'emailAndPassword' });
                const csrfToken = yield this.securityService.createCsrfToken();
                const result = { user, sessionToken, csrfToken };
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    upgradeAnonymousUserInDatabase({ email, passwordHash, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(userId);
            if (!user.isAnonymous)
                throw new Error('User is not anonymous');
            const emailAndPasswordProvider = new email_and_password_provider_entity_1.EmailAndPasswordProvider();
            emailAndPasswordProvider.email = email;
            emailAndPasswordProvider.passwordHash = passwordHash;
            user.isAnonymous = false;
            user.roles = ['user'];
            user.emailAndPasswordProvider = emailAndPasswordProvider;
            return yield this.userRepository.save(user);
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
EmailAndPasswordService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __param(1, common_1.Inject('EmailAndPasswordProviderRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        security_service_1.SecurityService])
], EmailAndPasswordService);
exports.EmailAndPasswordService = EmailAndPasswordService;

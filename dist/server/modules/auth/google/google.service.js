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
const GoogleAuthLibrary = require("google-auth-library");
const environment_1 = require("../../../../src/environments/environment");
const user_entity_1 = require("../user.entity");
const google_provider_entity_1 = require("./google-provider.entity");
const security_service_1 = require("../../common/security/security.service");
let GoogleService = class GoogleService {
    constructor(userRepository, googleProviderRepository, securityService) {
        this.userRepository = userRepository;
        this.googleProviderRepository = googleProviderRepository;
        this.securityService = securityService;
        this.googleOAuth2 = new GoogleAuthLibrary.OAuth2Client();
    }
    verifyIdToken(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifiedIdToken = yield this.googleOAuth2.verifyIdToken({
                    idToken,
                    audience: environment_1.environment.googleLoginProvider,
                });
                return verifiedIdToken.getAttributes().payload;
            }
            catch (e) {
                return false;
            }
        });
    }
    findGoogleProviderBySocialUid(socialUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.googleProviderRepository.findOne({
                where: { socialUid },
            });
        });
    }
    findUserAccountByGoogleProviderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({
                where: { googleProviderId: id },
                relations: ['googleProvider'],
            });
        });
    }
    findGoogleProviderById(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.googleProviderRepository.findOne({
                where: { id: providerId },
                cache: true,
            });
        });
    }
    createGoogleUserSessionAndCSRF(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.addGoogleUserToDatabase(socialUser);
                const sessionToken = yield this.securityService.createSessionToken({
                    roles: user.roles,
                    id: user.id,
                    loginProvider: socialUser.provider,
                });
                const csrfToken = yield this.securityService.createCsrfToken();
                const result = { user, sessionToken, csrfToken };
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    addGoogleUserToDatabase(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleProvider = new google_provider_entity_1.GoogleProvider();
            googleProvider.accessToken = socialUser.accessToken;
            googleProvider.email = socialUser.email;
            googleProvider.idToken = socialUser.idToken;
            googleProvider.name = socialUser.name;
            googleProvider.photoUrl = socialUser.photoUrl;
            googleProvider.socialUid = socialUser.socialUid;
            const user = new user_entity_1.User();
            user.isAnonymous = false;
            user.roles = ['user'];
            user.googleProvider = googleProvider;
            return yield this.userRepository.save(user);
        });
    }
    loginGoogleUserSessionAndCSRF(googleProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserAccountByGoogleProviderId(googleProvider.id);
            const sessionToken = yield this.securityService.createSessionToken({
                roles: user.roles,
                id: user.id,
                loginProvider: 'google',
            });
            const csrfToken = yield this.securityService.createCsrfToken();
            const result = { user, sessionToken, csrfToken };
            return result;
        });
    }
    linkProviderToExistingAccount(user, socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = user;
            const googleProvider = new google_provider_entity_1.GoogleProvider();
            googleProvider.accessToken = socialUser.accessToken;
            googleProvider.email = socialUser.email;
            googleProvider.idToken = socialUser.idToken;
            googleProvider.name = socialUser.name;
            googleProvider.photoUrl = socialUser.photoUrl;
            googleProvider.socialUid = socialUser.socialUid;
            updatedUser.googleProvider = googleProvider;
            yield this.userRepository.save(updatedUser);
            const sessionToken = yield this.securityService.createSessionToken({
                roles: updatedUser.roles,
                id: updatedUser.id,
                loginProvider: 'google',
            });
            const csrfToken = yield this.securityService.createCsrfToken();
            const result = { user: updatedUser, sessionToken, csrfToken };
            return result;
        });
    }
    removeGoogleProvider(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.googleProviderRepository.remove(provider);
        });
    }
    revokeAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.googleOAuth2.revokeToken(accessToken);
        });
    }
};
GoogleService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __param(1, common_1.Inject('GoogleProviderRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        security_service_1.SecurityService])
], GoogleService);
exports.GoogleService = GoogleService;

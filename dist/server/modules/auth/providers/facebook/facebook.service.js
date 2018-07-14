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
const typeorm_2 = require("@nestjs/typeorm");
const fb_1 = require("fb");
const user_entity_1 = require("../../user.entity");
const facebook_provider_entity_1 = require("./facebook-provider.entity");
const security_service_1 = require("../../../common/security/security.service");
let FacebookService = class FacebookService {
    constructor(userRepository, facebookProviderRepository, securityService) {
        this.userRepository = userRepository;
        this.facebookProviderRepository = facebookProviderRepository;
        this.securityService = securityService;
    }
    verifyAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifiedAccessToken = yield fb_1.default.api('me', {
                    access_token: accessToken,
                    fields: 'id,email',
                });
                return verifiedAccessToken;
            }
            catch (e) {
                return false;
            }
        });
    }
    findFacebookProviderBySocialUid(socialUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.facebookProviderRepository.findOne({
                where: { socialUid },
            });
        });
    }
    findUserAccountByFacebookProviderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({
                where: { facebookProviderId: id },
                relations: ['facebookProvider'],
            });
        });
    }
    findFacebookProviderById(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.facebookProviderRepository.findOne({
                where: { id: providerId },
                cache: true,
            });
        });
    }
    createFacebookUserSessionAndCSRF(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.addFacebookUserToDatabase(socialUser);
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
    addFacebookUserToDatabase(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const facebookProvider = new facebook_provider_entity_1.FacebookProvider();
            facebookProvider.accessToken = socialUser.accessToken;
            facebookProvider.email = socialUser.email;
            facebookProvider.name = socialUser.name;
            facebookProvider.photoUrl = socialUser.photoUrl;
            facebookProvider.socialUid = socialUser.socialUid;
            const user = new user_entity_1.User();
            user.isAnonymous = false;
            user.roles = ['user'];
            user.facebookProvider = facebookProvider;
            return yield this.userRepository.save(user);
        });
    }
    loginFacebookUserSessionAndCSRF(facebookProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserAccountByFacebookProviderId(facebookProvider.id);
            const sessionToken = yield this.securityService.createSessionToken({
                roles: user.roles,
                id: user.id,
                loginProvider: 'facebook',
            });
            const csrfToken = yield this.securityService.createCsrfToken();
            const result = { user, sessionToken, csrfToken };
            return result;
        });
    }
    linkProviderToExistingAccount(user, socialUser, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = user;
            const facebookProvider = new facebook_provider_entity_1.FacebookProvider();
            facebookProvider.accessToken = socialUser.accessToken;
            facebookProvider.email = socialUser.email;
            facebookProvider.name = socialUser.name;
            facebookProvider.photoUrl = socialUser.photoUrl;
            facebookProvider.socialUid = socialUser.socialUid;
            updatedUser.facebookProvider = facebookProvider;
            yield this.userRepository.save(updatedUser);
            const sessionToken = yield this.securityService.createSessionToken({
                roles: updatedUser.roles,
                id: updatedUser.id,
                loginProvider: 'facebook',
                refreshToken,
            });
            const csrfToken = yield this.securityService.createCsrfToken();
            const result = { user: updatedUser, sessionToken, csrfToken };
            return result;
        });
    }
    removeFacebookProvider(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.facebookProviderRepository.remove(provider);
        });
    }
    revokeAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fb_1.default.api('me/permissions', 'delete', {
                access_token: accessToken,
            });
        });
    }
};
FacebookService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_2.InjectRepository(facebook_provider_entity_1.FacebookProvider)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        security_service_1.SecurityService])
], FacebookService);
exports.FacebookService = FacebookService;

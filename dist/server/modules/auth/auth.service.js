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
const google_service_1 = require("./google/google.service");
const facebook_service_1 = require("./facebook/facebook.service");
const mailgun_service_1 = require("../common/mailgun.service");
const security_service_1 = require("../common/security/security.service");
let AuthService = class AuthService {
    constructor(userRepository, emailAndPasswordService, anonymousService, googleService, facebookService, mailgunService, securityService) {
        this.userRepository = userRepository;
        this.emailAndPasswordService = emailAndPasswordService;
        this.anonymousService = anonymousService;
        this.googleService = googleService;
        this.facebookService = facebookService;
        this.mailgunService = mailgunService;
        this.securityService = securityService;
    }
    loginEmailAndPasswordUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.emailAndPasswordService.findUserByEmail(body.email);
            const userExists = user === undefined ? false : true;
            if (!userExists) {
                return {
                    apiCallResult: false,
                    result: { error: 'user does not exist' },
                };
            }
            else {
                try {
                    const loginResult = yield this.emailAndPasswordService.loginAndCreateSession(body, user);
                    if (loginResult['message'] === 'Password Invalid')
                        throw new Error('Password Invalid');
                    const result = {
                        apiCallResult: true,
                        result: {
                            user,
                            sessionToken: loginResult.sessionToken,
                            csrfToken: loginResult.csrfToken,
                        },
                    };
                    return result;
                }
                catch (error) {
                    const result = {
                        apiCallResult: false,
                        result: { error: 'Password Invalid' },
                    };
                    return result;
                }
            }
        });
    }
    authenticateSocialUser(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (socialUser.provider) {
                    case 'google':
                        return this.authenticateGoogleUser(socialUser);
                    case 'facebook':
                        return this.authenticateFacebookUser(socialUser);
                }
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'Invalid Social Provider. How did you trigger this error?' },
                };
                return result;
            }
        });
    }
    authenticateGoogleUser(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifiedGoogleJWT = yield this.googleService.verifyIdToken(socialUser.idToken);
                if (verifiedGoogleJWT === false) {
                    const result = {
                        apiCallResult: false,
                        result: { error: 'Invalid JWT' },
                    };
                    return result;
                }
                const googleProvider = yield this.googleService.findGoogleProviderBySocialUid(socialUser.socialUid);
                if (googleProvider === undefined) {
                    const createGoogleUserResult = yield this.googleService.createGoogleUserSessionAndCSRF(socialUser);
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: createGoogleUserResult.user,
                            csrfToken: createGoogleUserResult.csrfToken,
                            sessionToken: createGoogleUserResult.sessionToken,
                        },
                    };
                    return result;
                }
                const loginGoogleUserResult = yield this.googleService.loginGoogleUserSessionAndCSRF(googleProvider);
                const result = {
                    apiCallResult: true,
                    result: {
                        user: loginGoogleUserResult.user,
                        csrfToken: loginGoogleUserResult.csrfToken,
                        sessionToken: loginGoogleUserResult.sessionToken,
                    },
                };
                return result;
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'unknown error authenticating google user' },
                };
                return result;
            }
        });
    }
    authenticateFacebookUser(socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifiedAccessToken = yield this.facebookService.verifyAccessToken(socialUser.accessToken);
                if (verifiedAccessToken === false ||
                    socialUser.email !== verifiedAccessToken['email'] ||
                    socialUser.socialUid !== verifiedAccessToken['id']) {
                    const result = {
                        apiCallResult: false,
                        result: { error: 'Invalid Access Token' },
                    };
                    return result;
                }
                const facebookProvider = yield this.facebookService.findFacebookProviderBySocialUid(socialUser.socialUid);
                if (facebookProvider === undefined) {
                    const createFacebookUserResult = yield this.facebookService.createFacebookUserSessionAndCSRF(socialUser);
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: createFacebookUserResult.user,
                            csrfToken: createFacebookUserResult.csrfToken,
                            sessionToken: createFacebookUserResult.sessionToken,
                        },
                    };
                    return result;
                }
                const loginFacebookUserResult = yield this.facebookService.loginFacebookUserSessionAndCSRF(facebookProvider);
                const result = {
                    apiCallResult: true,
                    result: {
                        user: loginFacebookUserResult.user,
                        csrfToken: loginFacebookUserResult.csrfToken,
                        sessionToken: loginFacebookUserResult.sessionToken,
                    },
                };
                return result;
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'unknown error authenticating facebook user' },
                };
                return result;
            }
        });
    }
    verifyEmailAndPasswordValidity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameTaken = yield this.emailAndPasswordService.emailTaken(body.email);
            if (usernameTaken) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'Email already in use' },
                };
                return result;
            }
            const passwordErrors = this.emailAndPasswordService.validatePassword(body.password);
            if (passwordErrors.length > 0) {
                const result = {
                    apiCallResult: false,
                    result: { error: passwordErrors },
                };
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
                            csrfToken: createUserResult.csrfToken,
                        },
                    };
                    return result;
                }
                catch (e) {
                    const result = {
                        apiCallResult: false,
                        result: {
                            error: 'Error creating new email and password user',
                        },
                    };
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
                        csrfToken: createAnonymousUserResult.csrfToken,
                    },
                };
                return result;
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'Error creating new anonymous user' },
                };
                return result;
            }
        });
    }
    upgradeAnonymousUserToEmailAndPassword(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyResult = yield this.verifyEmailAndPasswordValidity(body);
            if (verifyResult !== 'success')
                return verifyResult;
            else {
                try {
                    const upgradeAnonymousUserToEmailAndPasswordResult = yield this.emailAndPasswordService.upgradeAnonymousUserToEmailAndPassword({
                        email: body.email,
                        password: body.password,
                        userId,
                    });
                    if (upgradeAnonymousUserToEmailAndPasswordResult['message'] === 'User is not anonymous')
                        return {
                            apiCallResult: false,
                            result: { error: 'User is not anonymous' },
                        };
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: upgradeAnonymousUserToEmailAndPasswordResult.user,
                            sessionToken: upgradeAnonymousUserToEmailAndPasswordResult.sessionToken,
                            csrfToken: upgradeAnonymousUserToEmailAndPasswordResult.csrfToken,
                        },
                    };
                    return result;
                }
                catch (e) {
                    return {
                        apiCallResult: false,
                        result: { error: 'Not logged in' },
                    };
                }
            }
        });
    }
    upgradeAnonymousUserToSocial(userId, socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anonymousUser = yield this.findUserByUuid(userId);
                if (anonymousUser.isAnonymous) {
                    switch (socialUser.provider) {
                        case 'google':
                            const googleUserSessionAndCSRF = yield this.authenticateGoogleUser(socialUser);
                            googleUserSessionAndCSRF.result.user = yield this.cleanUpOldUserData(anonymousUser, googleUserSessionAndCSRF.result.user);
                            return googleUserSessionAndCSRF;
                        case 'facebook':
                            const facebookUserSessionAndCSRF = yield this.authenticateFacebookUser(socialUser);
                            facebookUserSessionAndCSRF.result.user = yield this.cleanUpOldUserData(anonymousUser, facebookUserSessionAndCSRF.result.user);
                            return facebookUserSessionAndCSRF;
                    }
                }
                else {
                    return {
                        apiCallResult: false,
                        result: { error: 'User is not anonymous' },
                    };
                }
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'Error determining social provider or anon uuid' },
                };
            }
        });
    }
    linkProviderToAccount(userId, providerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (providerData.provider) {
                    case 'google':
                        return yield this.linkGoogleProviderToAccount(userId, providerData);
                    case 'facebook':
                        return yield this.linkFacebookProviderToAccount(userId, providerData);
                    case 'emailAndPassword':
                        return yield this.linkEmailAndPasswordProviderToAccount(userId, providerData);
                }
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'Error linking provider to account' },
                };
            }
        });
    }
    linkGoogleProviderToAccount(userId, socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // verify the socialUser data is good
                const verifiedGoogleJWT = yield this.googleService.verifyIdToken(socialUser.idToken);
                if (verifiedGoogleJWT === false) {
                    const result = {
                        apiCallResult: false,
                        result: { error: 'Invalid JWT' },
                    };
                    return result;
                }
                // look up provider account by socialUid
                const googleProvider = yield this.googleService.findGoogleProviderBySocialUid(socialUser.socialUid);
                const user = yield this.findUserByUuid(userId);
                // if provider account does not exist, add provider to user data, update database, return updated user data
                if (googleProvider === undefined) {
                    const updatedUser = yield this.googleService.linkProviderToExistingAccount(user, socialUser);
                    return {
                        apiCallResult: true,
                        result: {
                            user: updatedUser.user,
                            sessionToken: updatedUser.sessionToken,
                            csrfToken: updatedUser.csrfToken,
                        },
                    };
                }
                const otherUserWithCurrentGoogleAccount = yield this.googleService.findUserAccountByGoogleProviderId(googleProvider.id);
                user.googleProviderId = googleProvider.id;
                user.googleProvider = googleProvider;
                // check for conflicts, one provider at a time
                if (user.emailAndPasswordProviderId === null) {
                    if (otherUserWithCurrentGoogleAccount.emailAndPasswordProviderId === null) {
                    }
                    else {
                        user.emailAndPasswordProviderId = otherUserWithCurrentGoogleAccount.emailAndPasswordProviderId;
                        user.emailAndPasswordProvider = otherUserWithCurrentGoogleAccount.emailAndPasswordProvider;
                    }
                }
                else if (otherUserWithCurrentGoogleAccount.emailAndPasswordProviderId !== null) {
                    if (user.emailAndPasswordProviderId !== otherUserWithCurrentGoogleAccount.emailAndPasswordProviderId) {
                        return { apiCallResult: false, result: { error: 'cannot merge accounts: emailAndPassword conflict' } };
                    }
                }
                if (user.facebookProviderId === null) {
                    if (otherUserWithCurrentGoogleAccount.facebookProviderId === null) {
                    }
                    else {
                        user.facebookProviderId = otherUserWithCurrentGoogleAccount.facebookProviderId;
                        user.facebookProvider = otherUserWithCurrentGoogleAccount.facebookProvider;
                    }
                }
                else if (otherUserWithCurrentGoogleAccount.facebookProviderId !== null) {
                    if (user.facebookProviderId !== otherUserWithCurrentGoogleAccount.facebookProviderId) {
                        return { apiCallResult: false, result: { error: 'cannot merge accounts: facebook conflict' } };
                    }
                }
                const updatedUser = yield this.cleanUpOldUserData(otherUserWithCurrentGoogleAccount, user);
                yield this.userRepository.save(updatedUser);
                const userSessionAndCSRFToken = yield this.googleService.loginGoogleUserSessionAndCSRF(updatedUser.googleProvider);
                return {
                    apiCallResult: true,
                    result: {
                        user: userSessionAndCSRFToken.user,
                        sessionToken: userSessionAndCSRFToken.sessionToken,
                        csrfToken: userSessionAndCSRFToken.csrfToken,
                    },
                };
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'unknown error linking google provider to account' },
                };
                return result;
            }
        });
    }
    linkFacebookProviderToAccount(userId, socialUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // verify the socialUser data is good
                const verifiedAccessToken = yield this.facebookService.verifyAccessToken(socialUser.accessToken);
                if (verifiedAccessToken === false ||
                    socialUser.email !== verifiedAccessToken['email'] ||
                    socialUser.socialUid !== verifiedAccessToken['id']) {
                    const result = {
                        apiCallResult: false,
                        result: { error: 'Invalid Access Token' },
                    };
                    return result;
                }
                const facebookProvider = yield this.facebookService.findFacebookProviderBySocialUid(socialUser.socialUid);
                const user = yield this.findUserByUuid(userId);
                if (facebookProvider === undefined) {
                    const updatedUser = yield this.facebookService.linkProviderToExistingAccount(user, socialUser);
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: updatedUser.user,
                            csrfToken: updatedUser.csrfToken,
                            sessionToken: updatedUser.sessionToken,
                        },
                    };
                    return result;
                }
                const otherUserWithCurrentFacebookAccount = yield this.facebookService.findUserAccountByFacebookProviderId(facebookProvider.id);
                user.facebookProviderId = facebookProvider.id;
                user.facebookProvider = facebookProvider;
                // check for conflicts, one provider at a time
                if (user.emailAndPasswordProviderId === null) {
                    if (otherUserWithCurrentFacebookAccount.emailAndPasswordProviderId === null) {
                    }
                    else {
                        user.emailAndPasswordProviderId = otherUserWithCurrentFacebookAccount.emailAndPasswordProviderId;
                        user.emailAndPasswordProvider = otherUserWithCurrentFacebookAccount.emailAndPasswordProvider;
                    }
                }
                else if (otherUserWithCurrentFacebookAccount.emailAndPasswordProviderId !== null) {
                    if (user.emailAndPasswordProviderId !== otherUserWithCurrentFacebookAccount.emailAndPasswordProviderId) {
                        return { apiCallResult: false, result: { error: 'cannot merge accounts: emailAndPassword conflict' } };
                    }
                }
                if (user.googleProviderId === null) {
                    if (otherUserWithCurrentFacebookAccount.googleProviderId === null) {
                    }
                    else {
                        user.googleProviderId = otherUserWithCurrentFacebookAccount.googleProviderId;
                        user.googleProvider = otherUserWithCurrentFacebookAccount.googleProvider;
                    }
                }
                else if (otherUserWithCurrentFacebookAccount.googleProviderId !== null) {
                    if (user.googleProviderId !== otherUserWithCurrentFacebookAccount.googleProviderId) {
                        return { apiCallResult: false, result: { error: 'cannot merge accounts: google conflict' } };
                    }
                }
                const updatedUser = yield this.cleanUpOldUserData(otherUserWithCurrentFacebookAccount, user);
                yield this.userRepository.save(updatedUser);
                const userSessionAndCSRFToken = yield this.facebookService.loginFacebookUserSessionAndCSRF(updatedUser.facebookProvider);
                return {
                    apiCallResult: true,
                    result: {
                        user: userSessionAndCSRFToken.user,
                        sessionToken: userSessionAndCSRFToken.sessionToken,
                        csrfToken: userSessionAndCSRFToken.csrfToken,
                    },
                };
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'unknown error linking facebook provider to account' },
                };
                return result;
            }
        });
    }
    linkEmailAndPasswordProviderToAccount(userId, emailAndPasswordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // look up user and provider, if provider doesn't exist, validate password,
                const user = yield this.findUserByUuid(userId);
                const emailAndPasswordProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderByEmail(emailAndPasswordUser.email);
                if (emailAndPasswordProvider === undefined) {
                    const passwordErrors = this.emailAndPasswordService.validatePassword(emailAndPasswordUser.password);
                    if (passwordErrors.length > 0) {
                        const result = {
                            apiCallResult: false,
                            result: { error: passwordErrors },
                        };
                        return result;
                    }
                    // create provider and add to user data, update database, return updated user data
                    const updatedUser = yield this.emailAndPasswordService.linkProviderToExistingAccount(user, {
                        email: emailAndPasswordUser.email,
                        password: emailAndPasswordUser.password,
                    });
                    const result = {
                        apiCallResult: true,
                        result: {
                            user: updatedUser.user,
                            csrfToken: updatedUser.csrfToken,
                            sessionToken: updatedUser.sessionToken,
                        },
                    };
                    return result;
                }
                // attempt to log in.
                const isPasswordValid = yield this.securityService.verifyPasswordHash({
                    passwordHash: emailAndPasswordProvider.passwordHash,
                    password: emailAndPasswordUser.password,
                });
                // if unsuccessful return failure result
                if (!isPasswordValid) {
                    const result = {
                        apiCallResult: false,
                        result: { error: 'Password Invalid' },
                    };
                    return result;
                }
                //if successful, assign successful details to current user
                const otherUserWithCurrentEmailAndPasswordAccount = yield this.emailAndPasswordService.findUserAccountByEmailAndPasswordProviderId(emailAndPasswordProvider.id);
                user.emailAndPasswordProviderId = emailAndPasswordProvider.id;
                user.emailAndPasswordProvider = emailAndPasswordProvider;
                // check for conflicts, one provider at a time, adding provider details to main user if there are no conflicts.
                if (user.googleProviderId === null) {
                    if (otherUserWithCurrentEmailAndPasswordAccount.googleProviderId === null) {
                    }
                    else {
                        user.googleProviderId = otherUserWithCurrentEmailAndPasswordAccount.googleProviderId;
                        user.googleProvider = otherUserWithCurrentEmailAndPasswordAccount.googleProvider;
                    }
                }
                else if (otherUserWithCurrentEmailAndPasswordAccount.googleProviderId !== null) {
                    if (user.googleProviderId !== otherUserWithCurrentEmailAndPasswordAccount.googleProviderId) {
                        return { apiCallResult: false, result: { error: 'cannot merge accounts: google conflict' } };
                    }
                }
                if (user.facebookProviderId === null) {
                    if (otherUserWithCurrentEmailAndPasswordAccount.facebookProviderId === null) {
                    }
                    else {
                        user.facebookProviderId = otherUserWithCurrentEmailAndPasswordAccount.facebookProviderId;
                        user.facebookProvider = otherUserWithCurrentEmailAndPasswordAccount.facebookProvider;
                    }
                }
                else if (otherUserWithCurrentEmailAndPasswordAccount.facebookProviderId !== null) {
                    if (user.facebookProviderId !== otherUserWithCurrentEmailAndPasswordAccount.facebookProviderId) {
                        return { apiCallResult: false, result: { error: 'cannot merge accounts: facebook conflict' } };
                    }
                }
                const updatedUser = yield this.cleanUpOldUserData(otherUserWithCurrentEmailAndPasswordAccount, user);
                yield this.userRepository.save(updatedUser);
                const sessionAndCSRFToken = yield this.emailAndPasswordService.loginAndCreateSession({ email: emailAndPasswordUser.email, password: emailAndPasswordUser.password }, updatedUser);
                return {
                    apiCallResult: true,
                    result: {
                        user: updatedUser,
                        sessionToken: sessionAndCSRFToken.sessionToken,
                        csrfToken: sessionAndCSRFToken.csrfToken,
                    },
                };
            }
            catch (e) {
                const result = {
                    apiCallResult: false,
                    result: { error: 'unknown error linking emailAndPassword provider to account' },
                };
                return result;
            }
        });
    }
    cleanUpOldUserData(oldUser, existingUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // merge any data from oldUser into existingUser
            // i will likely add features to this function as i create data
            // for now there is nothing else to do but delete the old user
            this.userRepository.remove(oldUser);
            return existingUser;
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
                const user = yield this.findUserByUuid(jwt['sub']);
                if (user.isAnonymous) {
                    return { apiCallResult: true, result: { user } };
                }
                switch (jwt['loginProvider']) {
                    case 'emailAndPassword':
                        const emailProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId);
                        user.emailAndPasswordProvider = emailProvider;
                        return { apiCallResult: true, result: { user } };
                    case 'google':
                        const googleProvider = yield this.googleService.findGoogleProviderById(user.googleProviderId);
                        user.googleProvider = googleProvider;
                        return { apiCallResult: true, result: { user } };
                    case 'facebook':
                        const facebookProvider = yield this.facebookService.findFacebookProviderById(user.facebookProviderId);
                        user.facebookProvider = facebookProvider;
                        return { apiCallResult: true, result: { user } };
                }
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'could not reauthenticate' },
                };
            }
        });
    }
    requestPasswordReset({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.emailAndPasswordService.findUserByEmail(email);
                const userExists = user === undefined ? false : true;
                if (!userExists)
                    return {
                        apiCallResult: false,
                        result: { error: 'user does not exist' },
                    };
                const token = yield this.securityService.createPasswordResetToken(email);
                const emailAndPasswordProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId);
                user.emailAndPasswordProvider = emailAndPasswordProvider;
                user.emailAndPasswordProvider.passwordResetToken = token;
                yield this.userRepository.save(user);
                const passwordResetEmail = yield this.mailgunService.sendPasswordResetEmail({
                    email,
                    token,
                });
                return { apiCallResult: true, result: {} };
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'error requesting password reset' },
                };
            }
        });
    }
    resetPassword({ password, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedTokenOrError = yield this.securityService.decodePasswordResetToken(token);
                if (decodedTokenOrError === 'jwt expired')
                    return {
                        apiCallResult: false,
                        result: { error: 'jwt expired' },
                    };
                const emailAndPasswordProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderByEmail(decodedTokenOrError.email);
                if (token !== emailAndPasswordProvider.passwordResetToken)
                    return {
                        apiCallResult: false,
                        result: { error: 'jwt does not match database' },
                    };
                emailAndPasswordProvider.passwordResetToken = null;
                const passwordErrors = this.emailAndPasswordService.validatePassword(password);
                if (passwordErrors.length > 0)
                    return {
                        apiCallResult: false,
                        result: { error: passwordErrors },
                    };
                const passwordHash = yield this.securityService.createPasswordHash({
                    password,
                });
                emailAndPasswordProvider.passwordHash = passwordHash;
                const user = yield this.emailAndPasswordService.findUserAccountByEmailAndPasswordProviderId(emailAndPasswordProvider.id);
                user.emailAndPasswordProvider = emailAndPasswordProvider;
                yield this.userRepository.save(user);
                const sessionToken = yield this.securityService.createSessionToken({
                    roles: user.roles,
                    id: user.id,
                    loginProvider: 'emailAndPassword',
                });
                const csrfToken = yield this.securityService.createCsrfToken();
                return {
                    apiCallResult: true,
                    result: { user, sessionToken, csrfToken },
                };
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'error resetting password' },
                };
            }
        });
    }
    changePassword(body, jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne(jwt.sub);
                const emailAndPasswordProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderById(user.emailAndPasswordProviderId);
                const isPasswordValid = yield this.securityService.verifyPasswordHash({
                    passwordHash: emailAndPasswordProvider.passwordHash,
                    password: body.oldPassword,
                });
                if (!isPasswordValid)
                    return {
                        apiCallResult: false,
                        result: { error: 'Password Invalid' },
                    };
                const passwordErrors = this.emailAndPasswordService.validatePassword(body.newPassword);
                if (passwordErrors.length > 0)
                    return {
                        apiCallResult: false,
                        result: { error: passwordErrors },
                    };
                const newPasswordHash = yield this.securityService.createPasswordHash({
                    password: body.newPassword,
                });
                emailAndPasswordProvider.passwordHash = newPasswordHash;
                yield this.emailAndPasswordService.updateEmailAndPasswordProvider(emailAndPasswordProvider);
                return { apiCallResult: true, result: {} };
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'error changing password' },
                };
            }
        });
    }
    deleteAccount(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToBeDeleted = yield this.userRepository.findOne(jwt.sub);
                const providersToBeDeleted = [];
                userToBeDeleted.emailAndPasswordProviderId !== null ? providersToBeDeleted.push('emailAndPassword') : null;
                userToBeDeleted.facebookProviderId !== null ? providersToBeDeleted.push('facebook') : null;
                userToBeDeleted.googleProviderId !== null ? providersToBeDeleted.push('google') : null;
                yield this.userRepository.remove(userToBeDeleted);
                providersToBeDeleted.forEach((provider) => __awaiter(this, void 0, void 0, function* () {
                    switch (provider) {
                        case 'emailAndPassword':
                            const emailProvider = yield this.emailAndPasswordService.findEmailAndPasswordProviderById(userToBeDeleted.emailAndPasswordProviderId);
                            yield this.emailAndPasswordService.removeEmailAndPasswordProvider(emailProvider);
                            break;
                        case 'facebook':
                            const facebookProvider = yield this.facebookService.findFacebookProviderById(userToBeDeleted.facebookProviderId);
                            this.facebookService.revokeAccessToken(facebookProvider.accessToken);
                            yield this.facebookService.removeFacebookProvider(facebookProvider);
                            break;
                        case 'google':
                            const googleProvider = yield this.googleService.findGoogleProviderById(userToBeDeleted.googleProviderId);
                            this.googleService.revokeAccessToken(googleProvider.accessToken);
                            yield this.googleService.removeGoogleProvider(googleProvider);
                            break;
                    }
                }));
                return { apiCallResult: true, result: {} };
            }
            catch (e) {
                return {
                    apiCallResult: false,
                    result: { error: 'error deleting account' },
                };
            }
        });
    }
};
AuthService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        email_and_password_service_1.EmailAndPasswordService,
        anonymous_service_1.AnonymousService,
        google_service_1.GoogleService,
        facebook_service_1.FacebookService,
        mailgun_service_1.MailgunService,
        security_service_1.SecurityService])
], AuthService);
exports.AuthService = AuthService;

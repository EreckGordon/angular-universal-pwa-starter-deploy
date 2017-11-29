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
const auth_service_1 = require("../auth/auth.service");
const article_service_1 = require("../article/article.service");
let APIService = class APIService {
    constructor(authService, articleService) {
        this.authService = authService;
        this.articleService = articleService;
    }
    get publicRSAKey() {
        return this.authService.publicRSAKey;
    }
    decodeJwt(jwt) {
        return this.authService.decodeJwt(jwt);
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = body;
            const user = yield this.authService.findUserByEmail(credentials.email);
            const userExists = user === undefined ? false : true;
            if (!userExists) {
                const result = { apiCallResult: false, result: { error: 'user does not exist' } };
                return result;
            }
            else {
                try {
                    const loginResult = yield this.authService.loginAndCreateSession(credentials, user);
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
            const usernameTaken = yield this.authService.emailTaken(credentials.email);
            if (usernameTaken) {
                const result = { apiCallResult: false, result: { error: 'Email already in use' } };
                return result;
            }
            const passwordErrors = this.authService.validatePassword(credentials.password);
            if (passwordErrors.length > 0) {
                const result = { apiCallResult: false, result: { error: passwordErrors } };
                return result;
            }
            else {
                try {
                    const createUserResult = yield this.authService.createUserAndSession(credentials);
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
};
APIService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        article_service_1.ArticleService])
], APIService);
exports.APIService = APIService;

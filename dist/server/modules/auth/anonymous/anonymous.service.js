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
const security_service_1 = require("../../common/security/security.service");
let AnonymousService = class AnonymousService {
    constructor(userRepository, securityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }
    createAnonymousUserAndSession() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.addAnonymousUserToDatabase();
                const sessionToken = yield this.securityService.createSessionToken({
                    roles: user.roles,
                    id: user.id.toString(),
                    loginProvider: 'anonymous',
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
    addAnonymousUserToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_entity_1.User();
            user.isAnonymous = true;
            user.roles = [''];
            return yield this.userRepository.save(user);
        });
    }
};
AnonymousService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        security_service_1.SecurityService])
], AnonymousService);
exports.AnonymousService = AnonymousService;

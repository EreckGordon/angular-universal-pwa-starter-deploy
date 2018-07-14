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
const refresh_token_entity_1 = require("./refresh-token.entity");
const util = require('util');
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const randomBytes = util.promisify(crypto.randomBytes);
const signJwt = util.promisify(jwt.sign);
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), 'private.key'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), 'public.key'));
let SecurityService = class SecurityService {
    constructor(refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }
    get publicRSAKey() {
        return RSA_PUBLIC_KEY;
    }
    createCsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield randomBytes(32).then(bytes => bytes.toString('hex'));
        });
    }
    createRefreshToken(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield randomBytes(16).then(bytes => bytes.toString('hex'));
            const refreshTokenEntity = new refresh_token_entity_1.RefreshToken();
            refreshTokenEntity.refreshToken = refreshToken;
            refreshTokenEntity.owner = uuid;
            refreshTokenEntity.expiration = Date.now() + 1210000000; // 2 weeks in ms
            this.refreshTokenRepository.save(refreshTokenEntity);
            return refreshToken;
        });
    }
    checkRefreshToken(refreshToken, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshTokenInDb = yield this.refreshTokenRepository.findOne(refreshToken);
                const validOwner = refreshTokenInDb.owner === uuid;
                const validToken = refreshTokenInDb.expiration > Date.now();
                if (validOwner && validToken)
                    return true;
                else {
                    yield this.refreshTokenRepository.remove(refreshTokenInDb);
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
    }
    deleteAllRefreshTokensAssociatedWithUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const associatedRefreshTokens = yield this.refreshTokenRepository.find({
                where: {
                    owner: uuid,
                },
            });
            if (associatedRefreshTokens !== undefined && associatedRefreshTokens.length > 0) {
                associatedRefreshTokens.forEach(token => this.refreshTokenRepository.remove(token));
            }
        });
    }
    createSessionToken({ roles, id, loginProvider, refreshToken = 'none' }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refreshToken === 'none') {
                refreshToken = yield this.createRefreshToken(id);
            }
            return yield signJwt({
                roles,
                loginProvider,
                refreshToken,
            }, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '10m',
                subject: id,
            });
        });
    }
    decodeJwt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.verify(token, RSA_PUBLIC_KEY, {
                ignoreExpiration: true,
            });
        });
    }
    createPasswordResetToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield signJwt({ email }, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '10m',
                subject: 'password-reset-token',
            });
        });
    }
    decodePasswordResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jwt.verify(token, RSA_PUBLIC_KEY, {
                    subject: 'password-reset-token',
                });
            }
            catch (e) {
                if (e.message === 'jwt expired')
                    return e.message;
                else {
                    return e;
                }
            }
        });
    }
    createPasswordHash({ password }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield argon2.hash(password);
        });
    }
    verifyPasswordHash({ passwordHash, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield argon2.verify(passwordHash, password);
        });
    }
};
SecurityService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SecurityService);
exports.SecurityService = SecurityService;

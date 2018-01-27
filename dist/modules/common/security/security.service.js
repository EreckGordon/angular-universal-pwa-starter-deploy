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
    constructor() { }
    get publicRSAKey() {
        return RSA_PUBLIC_KEY;
    }
    createCsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield randomBytes(32).then(bytes => bytes.toString("hex"));
        });
    }
    createSessionToken({ roles, id, loginProvider }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield signJwt({
                roles,
                loginProvider
            }, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '2h',
                subject: id
            });
        });
    }
    decodeJwt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.verify(token, RSA_PUBLIC_KEY, { ignoreExpiration: true });
        });
    }
    createPasswordResetToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield signJwt({}, RSA_PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '10m', subject: 'password-reset-token' });
        });
    }
    decodePasswordResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.verify(token, RSA_PUBLIC_KEY, { subject: 'password-reset-token' });
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
    common_1.Component(),
    __metadata("design:paramtypes", [])
], SecurityService);
exports.SecurityService = SecurityService;

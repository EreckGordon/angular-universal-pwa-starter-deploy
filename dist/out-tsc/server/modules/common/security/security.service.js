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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var util = require('util');
var fs = require("fs");
var path = require("path");
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var argon2 = require("argon2");
var randomBytes = util.promisify(crypto.randomBytes);
var signJwt = util.promisify(jwt.sign);
var RSA_PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), 'private.key'));
var RSA_PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), 'public.key'));
var SecurityService = /** @class */ (function () {
    function SecurityService() {
    }
    Object.defineProperty(SecurityService.prototype, "publicRSAKey", {
        get: function () {
            return RSA_PUBLIC_KEY;
        },
        enumerable: true,
        configurable: true
    });
    SecurityService.prototype.createCsrfToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, randomBytes(32).then(function (bytes) { return bytes.toString("hex"); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SecurityService.prototype.createSessionToken = function (_a) {
        var roles = _a.roles, id = _a.id, loginProvider = _a.loginProvider;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, signJwt({
                            roles: roles,
                            loginProvider: loginProvider
                        }, RSA_PRIVATE_KEY, {
                            algorithm: 'RS256',
                            expiresIn: '2h',
                            subject: id
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    SecurityService.prototype.decodeJwt = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jwt.verify(token, RSA_PUBLIC_KEY, { ignoreExpiration: true })];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    SecurityService.prototype.createPasswordHash = function (_a) {
        var password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, argon2.hash(password)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    SecurityService.prototype.verifyPasswordHash = function (_a) {
        var passwordHash = _a.passwordHash, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, argon2.verify(passwordHash, password)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    SecurityService = __decorate([
        common_1.Component(),
        __metadata("design:paramtypes", [])
    ], SecurityService);
    return SecurityService;
}());
exports.SecurityService = SecurityService;
//# sourceMappingURL=security.service.js.map
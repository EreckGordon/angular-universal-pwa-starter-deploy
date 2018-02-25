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
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user.entity");
var security_service_1 = require("../../common/security/security.service");
var AnonymousService = /** @class */ (function () {
    function AnonymousService(userRepository, securityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }
    AnonymousService.prototype.createAnonymousUserAndSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, sessionToken, csrfToken, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.addAnonymousUserToDatabase()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.securityService.createSessionToken({
                                roles: user.roles,
                                id: user.id.toString(),
                                loginProvider: 'anonymous',
                            })];
                    case 2:
                        sessionToken = _a.sent();
                        return [4 /*yield*/, this.securityService.createCsrfToken()];
                    case 3:
                        csrfToken = _a.sent();
                        result = { user: user, sessionToken: sessionToken, csrfToken: csrfToken };
                        return [2 /*return*/, result];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AnonymousService.prototype.addAnonymousUserToDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new user_entity_1.User();
                        user.isAnonymous = true;
                        user.roles = [''];
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AnonymousService = __decorate([
        common_1.Component(),
        __param(0, common_1.Inject('UserRepositoryToken')),
        __metadata("design:paramtypes", [typeorm_1.Repository,
            security_service_1.SecurityService])
    ], AnonymousService);
    return AnonymousService;
}());
exports.AnonymousService = AnonymousService;
//# sourceMappingURL=anonymous.service.js.map
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
const websockets_1 = require("@nestjs/websockets");
const cookie = require("cookie");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const security_service_1 = require("../../common/security/security.service");
const auth_cache_1 = require("../auth.cache");
let AuthGateway = class AuthGateway {
    // requiredRolesForRecentlyCreatedAnonEvent = ['user']; // add this for granular role check
    constructor(authCache, securityService) {
        this.authCache = authCache;
        this.securityService = securityService;
        this.requiredRolesForGateway = ['anon', 'user']; // match any role and you have access
        this.recentlyCreatedAnonEvent = 'recently-created-anon';
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedCookies = cookie.parse(client.request.headers.cookie);
            const userCookie = parsedCookies['SESSIONID'];
            if (!userCookie) {
                return client.disconnect();
            }
            const user = yield this.securityService.decodeJwt(userCookie);
            const canAccess = this.roleGuard(user.roles, this.requiredRolesForGateway);
            if (!canAccess) {
                return client.disconnect();
            }
            client.user = user;
        });
    }
    onRecentlyCreatedAnon(client, data) {
        /*
        * we can also do granular role guarding
        *
        * depending on what kind of action this socket is, we may want to check that the user exists in db before performing any action.
        * however, I have chosen to not check the db for normal type of interactions because the guard does not come without a cost.
        *
        const hasRole = this.roleGuard(client.user.roles, this.requiredRolesForRecentlyCreatedAnonEvent);
        if (!hasRole) {
            return of({ event: this.recentlyCreatedAnonEvent, data: [] });
        }
        */
        return this.authCache.wsObservable.pipe(operators_1.map(res => ({ event: this.recentlyCreatedAnonEvent, data: res })));
    }
    roleGuard(roles, requiredRoles) {
        return !!roles.find(role => !!requiredRoles.find(item => item === role));
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], AuthGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('recently-created-anon'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthGateway.prototype, "onRecentlyCreatedAnon", null);
AuthGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: 'api/auth/gateway', port: 8001 }),
    __metadata("design:paramtypes", [auth_cache_1.AuthCache, security_service_1.SecurityService])
], AuthGateway);
exports.AuthGateway = AuthGateway;

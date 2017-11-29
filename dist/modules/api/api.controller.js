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
const api_service_1 = require("./api.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let APIController = class APIController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    helloWorld(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(body);
            res.status(common_1.HttpStatus.OK).json({ hello: "world" });
        });
    }
    login(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginResult = yield this.apiService.login(body);
            if (loginResult.apiCallResult) {
                const { user, sessionToken, csrfToken } = loginResult.result;
                res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: true });
                res.cookie("XSRF-TOKEN", csrfToken);
                res.status(200).json({ id: user.id, email: user.email, roles: user.roles });
            }
            else {
                res.status(401).json(loginResult.result.error);
            }
        });
    }
    logout(res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield res.clearCookie("SESSIONID");
            yield res.clearCookie("XSRF-TOKEN");
            return res.sendStatus(200);
        });
    }
    createUser(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserResult = yield this.apiService.createUser(body);
            if (createUserResult.apiCallResult) {
                const { user, sessionToken, csrfToken } = createUserResult.result;
                res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: true });
                res.cookie("XSRF-TOKEN", csrfToken);
                res.status(200).json({ id: user.id, email: user.email, roles: user.roles });
            }
            else {
                switch (createUserResult.result.error) {
                    case "Email already in use":
                        res.sendStatus(409).json({ error: 'Email already in use' });
                        break;
                    case "Error creating new user":
                        res.sendStatus(500);
                        break;
                    default:
                        res.status(400).json(createUserResult.result.error);
                        break;
                }
            }
        });
    }
};
__decorate([
    common_1.Post('hello-world'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "helloWorld", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "login", null);
__decorate([
    common_1.Post('logout'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "logout", null);
__decorate([
    common_1.Post('create-user'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "createUser", null);
APIController = __decorate([
    common_1.Controller('api'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [api_service_1.APIService])
], APIController);
exports.APIController = APIController;

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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAllUsers() {
        return await this.userRepository.find();
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({ email });
    }
    async findUserById(id) {
        return await this.userRepository.findOne(id);
    }
    async createUser(email, passwordHash) {
        const user = new user_entity_1.User();
        user.email = email;
        user.passwordHash = passwordHash;
        user.roles = ['user'];
        return await this.userRepository.save(user);
    }
};
AuthService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;

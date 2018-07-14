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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
const chatroom_entity_1 = require("./chatroom.entity");
let Message = class Message {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.messages),
    __metadata("design:type", user_entity_1.User)
], Message.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chatroom_entity_1.Chatroom, chatroom => chatroom.messages),
    __metadata("design:type", chatroom_entity_1.Chatroom)
], Message.prototype, "chatroom", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
Message = __decorate([
    typeorm_1.Entity()
], Message);
exports.Message = Message;

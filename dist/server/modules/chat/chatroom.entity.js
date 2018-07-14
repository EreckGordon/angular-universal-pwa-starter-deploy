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
const message_entity_1 = require("./message.entity");
const user_entity_1 = require("../auth/user.entity");
let Chatroom = class Chatroom {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Chatroom.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Chatroom.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToMany(type => user_entity_1.User),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Chatroom.prototype, "populatedBy", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.user),
    __metadata("design:type", Array)
], Chatroom.prototype, "messages", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.chatroomOwner),
    __metadata("design:type", user_entity_1.User)
], Chatroom.prototype, "ownedBy", void 0);
Chatroom = __decorate([
    typeorm_1.Entity()
], Chatroom);
exports.Chatroom = Chatroom;

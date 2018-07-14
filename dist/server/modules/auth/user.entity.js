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
const email_and_password_provider_entity_1 = require("./providers/email-and-password/email-and-password-provider.entity");
const google_provider_entity_1 = require("./providers/google/google-provider.entity");
const facebook_provider_entity_1 = require("./providers/facebook/facebook-provider.entity");
const message_entity_1 = require("../chat/message.entity");
const chatroom_entity_1 = require("../chat/chatroom.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "isAnonymous", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "emailAndPasswordProviderId", void 0);
__decorate([
    typeorm_1.OneToOne(type => email_and_password_provider_entity_1.EmailAndPasswordProvider, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", email_and_password_provider_entity_1.EmailAndPasswordProvider)
], User.prototype, "emailAndPasswordProvider", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "googleProviderId", void 0);
__decorate([
    typeorm_1.OneToOne(type => google_provider_entity_1.GoogleProvider, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", google_provider_entity_1.GoogleProvider)
], User.prototype, "googleProvider", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "facebookProviderId", void 0);
__decorate([
    typeorm_1.OneToOne(type => facebook_provider_entity_1.FacebookProvider, { cascade: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", facebook_provider_entity_1.FacebookProvider)
], User.prototype, "facebookProvider", void 0);
__decorate([
    typeorm_1.ManyToMany(type => chatroom_entity_1.Chatroom, chatroom => chatroom.populatedBy),
    __metadata("design:type", Array)
], User.prototype, "chatrooms", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.user),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    typeorm_1.OneToMany(type => chatroom_entity_1.Chatroom, chatroom => chatroom.ownedBy),
    __metadata("design:type", Array)
], User.prototype, "chatroomOwner", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;

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
const user_entity_1 = require("../auth/user.entity");
const chatroom_entity_1 = require("./chatroom.entity");
const message_entity_1 = require("./message.entity");
const security_service_1 = require("../common/security/security.service");
const chat_cache_1 = require("./chat.cache");
let ChatService = class ChatService {
    constructor(chatRepository, messageRepository, userRepository, securityService, chatCache) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.securityService = securityService;
        this.chatCache = chatCache;
    }
    findChatroomByName(roomName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chatRepository.findOne({ where: { name: roomName } });
        });
    }
    createChatroom(roomName, userJWT) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(userJWT.sub);
            // console.log(user)
            const chatroom = new chatroom_entity_1.Chatroom();
            chatroom.name = roomName;
            chatroom.ownedBy = user;
            chatroom.populatedBy = [user];
            this.chatRepository.save(chatroom);
            // may need to prune some of the info returned here before emitting. maybe handle that in the service?
            return chatroom;
        });
    }
    addMessage(messageData, userJWT) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(userJWT.sub);
            const room = yield this.findChatroomByName(messageData.roomName);
            const message = new message_entity_1.Message();
            message.chatroom = room;
            message.createdDate = new Date();
            message.message = messageData.message;
            message.user = user;
            this.messageRepository.save(message);
            return message;
        });
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(chatroom_entity_1.Chatroom)),
    __param(1, typeorm_2.InjectRepository(message_entity_1.Message)),
    __param(2, typeorm_2.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        security_service_1.SecurityService,
        chat_cache_1.ChatCache])
], ChatService);
exports.ChatService = ChatService;

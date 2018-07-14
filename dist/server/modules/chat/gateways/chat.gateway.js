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
const security_service_1 = require("../../common/security/security.service");
const chat_cache_1 = require("../chat.cache");
const chat_service_1 = require("../chat.service");
let ChatGateway = class ChatGateway {
    constructor(chatCache, securityService, chatService) {
        this.chatCache = chatCache;
        this.securityService = securityService;
        this.chatService = chatService;
        this.requiredRolesForGateway = ['anon', 'user']; // match any role and you have access
        this.recentlyCreatedAnonEvent = 'recently-created-anon';
        this.requiredRolesForAdminRoute = ['admin']; // add this for granular role check
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
            client['user'] = user;
            client.emit('message', 'successfully connected to api/chat/gateway websocket');
            // look up user see what chatrooms they are a member of, and join those rooms
            // something like:
            // user.chatrooms.forEach(chatroom => {
            //    this.chatService.findChatroomById(chatroom.id)
            //        .then(room => client.emit('join-room', {roomName: room.name}))
            // })
        });
    }
    onJoinChatroom(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = client['user'];
            const chatroom = yield this.chatService.findChatroomByName(data.roomName);
            if (chatroom === undefined) {
                // disconnect from other chatrooms, currently doing this for simplicity. git rid of this in future
                client.leaveAll();
                const newlyCreatedChatroom = yield this.chatService.createChatroom(data.roomName, user);
                client.join(newlyCreatedChatroom.name);
                return client.emit('message', newlyCreatedChatroom);
            }
            // disconnect from other chatrooms, currently doing this for simplicity. git rid of this in future
            client.leaveAll();
            // add user to the chatroom db listing
            // connect to chat room
            // add user to table of chatrooms. this way they auto join in future. need some other magic too once i figure it out...
            // this.chatService.addUserToChatroom
            client.join(chatroom.name);
            // send contents of room to user
            return client.emit('message', chatroom);
            /*
            * this is the implementation for in memory db. lets now use the real db.
            *
            //give newly connected member contents of room (assuming it exists)
            if (this.chatCache.currentValue()[data.roomName]){
                client.emit('message', this.chatCache.currentValue()[data.roomName])
            }
            else {
                client.emit('message', `new room: ${data.roomName}`)
            }
            *
            * end of in memory db
            */
        });
    }
    onRecentlyCreatedAnon(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            * more in memory db impl
            *
            // add the message to the cache (for when new users join they can get all historical messages)
            this.chatCache.addData({
                message: data.message,
                messageId: Date.now(),
                roomId: 1,
                roomName: data.roomName,
                sender: '',
                senderId: '',
                timestamp: 1
            })
            // emit message to user, they concat to their chatlog
            return this.server.to(data.roomName).emit('message', data.message)
            *
            * end of in memory db
            */
            const savedMessage = yield this.chatService.addMessage(data, client['user']);
            // emit the message, for user to concat it to their chatlog
            return this.server.to(data.roomName).emit('message', savedMessage);
        });
    }
    roleGuard(roles, requiredRoles) {
        return roles.some(role => !!requiredRoles.find(item => item === role));
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('join-chatroom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onJoinChatroom", null);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onRecentlyCreatedAnon", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway(8002, { namespace: '/api/chat/gateway' }),
    __metadata("design:paramtypes", [chat_cache_1.ChatCache,
        security_service_1.SecurityService,
        chat_service_1.ChatService])
], ChatGateway);
exports.ChatGateway = ChatGateway;

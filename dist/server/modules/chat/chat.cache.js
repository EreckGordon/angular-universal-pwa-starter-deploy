"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ChatCache = class ChatCache {
    constructor() {
        this.chatBehaviorSubject = new rxjs_1.BehaviorSubject({});
        this.chatObservable = this.chatBehaviorSubject.asObservable();
    }
    currentValue() {
        return this.chatBehaviorSubject.getValue();
    }
    // used as in memory db, rather than full db integration
    addData(data) {
        const state = this.currentValue();
        this.chatBehaviorSubject.next(Object.assign({}, state, { [data.roomName]: Object.assign({ roomId: data.roomId, [data.messageId]: {
                    message: data.message,
                    sender: data.sender,
                    senderId: data.senderId,
                    timestamp: data.timestamp,
                } }, state[data.roomName]) }));
    }
};
ChatCache = __decorate([
    common_1.Injectable()
], ChatCache);
exports.ChatCache = ChatCache;

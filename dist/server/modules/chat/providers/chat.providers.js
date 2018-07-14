"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatroom_entity_1 = require("../chatroom.entity");
const message_entity_1 = require("../message.entity");
const typeorm_1 = require("@nestjs/typeorm");
exports.chatProviders = [typeorm_1.TypeOrmModule.forFeature([chatroom_entity_1.Chatroom]), typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message])];

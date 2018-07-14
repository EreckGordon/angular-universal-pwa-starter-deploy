"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const refresh_token_entity_1 = require("./security/refresh-token.entity");
const typeorm_1 = require("@nestjs/typeorm");
exports.commonProviders = [typeorm_1.TypeOrmModule.forFeature([refresh_token_entity_1.RefreshToken])];

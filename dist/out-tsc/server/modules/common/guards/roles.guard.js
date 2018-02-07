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
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var RolesGuard = (function () {
    function RolesGuard(reflector) {
        this.reflector = reflector;
    }
    RolesGuard.prototype.canActivate = function (req, context) {
        var parent = context.parent, handler = context.handler;
        var roles = this.reflector.get('roles', handler);
        if (!roles) {
            return true; // if you don't request a certain role, you return true so the guard doesn't break your other routes.
        }
        var user = req.user;
        var hasRole = function () { return !!user.roles.find(function (role) { return !!roles.find(function (item) { return item === role; }); }); };
        return user && user.roles && hasRole();
    };
    RolesGuard = __decorate([
        common_1.Guard(),
        __metadata("design:paramtypes", [core_1.Reflector])
    ], RolesGuard);
    return RolesGuard;
}());
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map
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
var core_1 = require("@angular/core");
var service_worker_1 = require("@angular/service-worker");
var material_1 = require("@angular/material");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/take");
var NGSWUpdateService = /** @class */ (function () {
    function NGSWUpdateService(swUpdate, snackBar) {
        var _this = this;
        this.swUpdate = swUpdate;
        this.snackBar = snackBar;
        this.checkForUpdateSubj = new Subject_1.Subject();
        this.checkInterval = 1000 * 60 * 60 * 6; // 6 hours
        this.swUpdate.available.subscribe(function (event) { return _this.reloadPrompt(); });
        this.checkForUpdateSubj
            .debounceTime(this.checkInterval)
            .startWith(null)
            .subscribe(function () { return _this.checkForUpdate(); });
    }
    NGSWUpdateService.prototype.checkForUpdate = function () {
        var _this = this;
        this.swUpdate
            .checkForUpdate()
            .then(function () { return _this.scheduleCheckForUpdate(); })
            .catch(function (err) { return console.error(err); });
    };
    NGSWUpdateService.prototype.activateUpdate = function () {
        var _this = this;
        this.swUpdate
            .activateUpdate()
            .then(function () { return _this.reloadPrompt(); })
            .catch(function (err) { return console.error(err); });
    };
    NGSWUpdateService.prototype.scheduleCheckForUpdate = function () {
        this.checkForUpdateSubj.next();
    };
    NGSWUpdateService.prototype.reloadPrompt = function () {
        this.snackBar
            .open('Updated Content Available, Press OK to Reload', 'OK')
            .afterDismissed()
            .take(1)
            .subscribe(function () { return window.location.reload(); });
    };
    NGSWUpdateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [service_worker_1.SwUpdate, material_1.MatSnackBar])
    ], NGSWUpdateService);
    return NGSWUpdateService;
}());
exports.NGSWUpdateService = NGSWUpdateService;
//# sourceMappingURL=ngsw-update.service.js.map
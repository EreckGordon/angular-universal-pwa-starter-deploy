"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var bidi_1 = require("@angular/cdk/bidi");
var portal_1 = require("@angular/cdk/portal");
var a11y_1 = require("@angular/cdk/a11y");
var platform_1 = require("@angular/cdk/platform");
var overlay_1 = require("@angular/cdk/overlay");
var MaterialModules = [
    material_1.MatButtonModule,
    material_1.MatButtonToggleModule,
    material_1.MatCardModule,
    material_1.MatCheckboxModule,
    material_1.MatDialogModule,
    material_1.MatIconModule,
    material_1.MatInputModule,
    material_1.MatListModule,
    material_1.MatMenuModule,
    material_1.MatProgressBarModule,
    material_1.MatRadioModule,
    material_1.MatRippleModule,
    material_1.MatSelectModule,
    material_1.MatSidenavModule,
    material_1.MatSnackBarModule,
    material_1.MatTabsModule,
    material_1.MatToolbarModule,
    material_1.MatTooltipModule,
    overlay_1.OverlayModule,
    portal_1.PortalModule,
    bidi_1.BidiModule,
    a11y_1.A11yModule,
    platform_1.PlatformModule,
    material_1.MatCommonModule
];
var CustomMaterialModule = /** @class */ (function () {
    function CustomMaterialModule() {
    }
    CustomMaterialModule = __decorate([
        core_1.NgModule({
            imports: [MaterialModules],
            exports: [MaterialModules],
        })
    ], CustomMaterialModule);
    return CustomMaterialModule;
}());
exports.CustomMaterialModule = CustomMaterialModule;
//# sourceMappingURL=index.js.map
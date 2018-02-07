"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var app_component_1 = require("./app.component");
var custom_material_module_1 = require("./shared/custom-material-module");
var service_worker_1 = require("@angular/service-worker");
var ngsw_update_service_1 = require("./shared/ngsw-update.service");
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                custom_material_module_1.CustomMaterialModule,
                service_worker_1.ServiceWorkerModule.register('', { enabled: false }),
            ],
            declarations: [app_component_1.AppComponent],
            providers: [ngsw_update_service_1.NGSWUpdateService],
        }).compileComponents();
    }));
    it('should create the app', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=app.component.spec.js.map
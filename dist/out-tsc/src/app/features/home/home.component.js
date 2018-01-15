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
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var seo_service_1 = require("../../shared/seo.service");
require("rxjs/add/operator/take");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(seoService, http, fb) {
        this.seoService = seoService;
        this.http = http;
        this.fb = fb;
        this.keywords = 'angular, universal, angular-cli, PWA, expressjs';
        this.description = 'ngiso: Angular Isomorphic. It is a Progressive Web App (PWA) built with Angular Universal.';
        this.seoService.setPageTitle('igiso - Angular Isomorphic');
        this.seoService.setKeywordsAndDescription(this.keywords, this.description);
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.createUserForm = this.fb.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    HomeComponent.prototype.helloWorld = function () {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers, withCredentials: true };
        var body = { hello: 'world' };
        var helloWorld = this.http.post('http://localhost:8000/hello-world', body, options)
            .take(1).subscribe(function (result) {
            console.log(result);
        }, function (error) { return console.log(error); });
    };
    HomeComponent.prototype.login = function () {
        var email = this.loginForm.value.email;
        var password = this.loginForm.value.password;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers, withCredentials: true };
        var body = { email: email, password: password };
        var loginResult = this.http.post('http://localhost:8000/auth/login-email-and-password-user', body, options)
            .take(1).subscribe(function (result) {
            console.log(result);
        }, function (error) { return console.log(error); });
    };
    HomeComponent.prototype.logout = function () {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers, withCredentials: true };
        var body = { bye: '!' };
        var logoutResult = this.http.post('http://localhost:8000/auth/logout', body, options)
            .take(1).subscribe(function (result) {
            console.log(result);
        }, function (error) { return console.log(error); });
    };
    HomeComponent.prototype.createUser = function () {
        var email = this.createUserForm.value.email;
        var password = this.createUserForm.value.password;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var options = { headers: headers, withCredentials: true };
        var body = { email: email, password: password };
        var createUserResult = this.http.post('http://localhost:8000/auth/create-email-and-password-user', body, options)
            .take(1).subscribe(function (result) {
            console.log(result);
        }, function (error) { return console.log(error); });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [seo_service_1.SEOService, http_1.HttpClient, forms_1.FormBuilder])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
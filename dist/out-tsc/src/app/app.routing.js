"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_found404_component_1 = require("./features/not-found404.component");
var sign_in_1 = require("./shared/auth/components/sign-in");
exports.routes = [
    { path: '', loadChildren: './features/home/home.module#HomeModule' },
    { path: 'about', loadChildren: './features/about/about.module#AboutModule' },
    { path: 'blog', loadChildren: './features/blog/blog.module#BlogModule' },
    { path: 'sign-in', component: sign_in_1.SignInComponent },
    { path: '**', component: not_found404_component_1.NotFound404Component }
];
//# sourceMappingURL=app.routing.js.map
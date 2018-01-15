"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./features/home/home.component");
var about_component_1 = require("./features/about/about.component");
var not_found404_component_1 = require("./features/not-found404.component");
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'blog', loadChildren: './features/blog/blog.module#BlogModule' },
    { path: '**', component: not_found404_component_1.NotFound404Component }
];
//# sourceMappingURL=app.routing.js.map
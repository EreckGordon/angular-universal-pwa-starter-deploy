"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_found404_component_1 = require("./features/not-found404.component");
// routes not seen here include:
//     auth module routes
exports.routes = [
    { path: '', loadChildren: './features/home/home.module#HomeModule' },
    {
        path: 'about',
        loadChildren: './features/about/about.module#AboutModule',
    },
    { path: 'blog', loadChildren: './features/blog/blog.module#BlogModule' },
    { path: '**', component: not_found404_component_1.NotFound404Component },
];
//# sourceMappingURL=app.routing.js.map
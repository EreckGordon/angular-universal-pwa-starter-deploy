"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blog_component_1 = require("./blog.component");
exports.routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: blog_component_1.BlogComponent
            }
        ]
    }
];
//# sourceMappingURL=blog.routing.js.map
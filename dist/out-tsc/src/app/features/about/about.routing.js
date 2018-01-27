"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var about_component_1 = require("./about.component");
exports.routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: about_component_1.AboutComponent
            }
        ]
    }
];
//# sourceMappingURL=about.routing.js.map
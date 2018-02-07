"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home.component");
exports.routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: home_component_1.HomeComponent,
            },
        ],
    },
];
//# sourceMappingURL=home.routing.js.map
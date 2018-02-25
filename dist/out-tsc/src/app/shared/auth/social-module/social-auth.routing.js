"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var social_auth_sign_in_component_1 = require("./components/social-auth-sign-in.component");
var link_social_to_account_component_1 = require("./components/link-social-to-account.component");
exports.routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: social_auth_sign_in_component_1.SocialAuthSignInComponent,
            },
            {
                path: 'link-social-to-account',
                component: link_social_to_account_component_1.LinkSocialToAccountComponent,
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];
//# sourceMappingURL=social-auth.routing.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
require("core-js/es6/reflect");
require("core-js/es7/reflect");
require("ts-helpers");
const core_1 = require("@nestjs/core");
const core_2 = require("@angular/core");
const express_engine_1 = require("@nguniversal/express-engine");
const module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const app_module_1 = require("./modules/app.module");
const DIST_FOLDER = path.join(process.cwd(), 'dist');
const DIST_BROWSER_FOLDER = path.join(DIST_FOLDER, 'dist-browser');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(path.join(DIST_FOLDER, 'dist-bridge', 'main.bundle'));
core_2.enableProdMode();
const configuredNgExpressEngine = express_engine_1.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
    ]
});
const server = express();
server.engine('html', configuredNgExpressEngine);
server.set('view engine', 'html');
server.set('views', DIST_BROWSER_FOLDER);
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization", "x-xsrf-token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: ['http://localhost:4200', 'http://localhost:8000'],
    preflightContinue: false,
    optionsSuccessStatus: 200
};
server.use(compression());
server.get('*.*', express.static(DIST_BROWSER_FOLDER, { maxAge: '1y' }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors(options));
server.options("*", cors(options));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.ApplicationModule, server);
    await app.listen(8000);
}
bootstrap();

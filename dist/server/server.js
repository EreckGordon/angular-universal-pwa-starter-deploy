"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
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
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(path.join(DIST_FOLDER, 'dist-bridge', 'main'));
core_2.enableProdMode();
const configuredNgExpressEngine = express_engine_1.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)],
});
const server = express();
server.engine('html', configuredNgExpressEngine);
server.set('view engine', 'html');
server.set('views', DIST_BROWSER_FOLDER);
const frontEndPort = 4200;
const backEndPort = 8000;
const options = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-xsrf-token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: [
        `http://localhost:${frontEndPort}`,
        `http://localhost:${backEndPort}`,
        'https://universal-demo.ereckgordon.com',
        'https://www.universal-demo.ereckgordon.com',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
server.use(compression());
server.get('*.*', express.static(DIST_BROWSER_FOLDER, { maxAge: '1y' }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors(options));
server.options('*', cors(options));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.ApplicationModule, server, {});
        yield app.listen(backEndPort);
    });
}
bootstrap();

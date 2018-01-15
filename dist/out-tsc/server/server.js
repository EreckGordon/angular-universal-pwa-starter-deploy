"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("zone.js/dist/zone-node");
require("reflect-metadata");
require("core-js/es6/reflect");
require("core-js/es7/reflect");
require("ts-helpers");
var core_1 = require("@nestjs/core");
var core_2 = require("@angular/core");
var express_engine_1 = require("@nguniversal/express-engine");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path = require("path");
var compression = require("compression");
var app_module_1 = require("./modules/app.module");
var DIST_FOLDER = path.join(process.cwd(), 'dist');
var DIST_BROWSER_FOLDER = path.join(DIST_FOLDER, 'dist-browser');
var _a = require(path.join(DIST_FOLDER, 'dist-bridge', 'main.bundle')), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
core_2.enableProdMode();
var configuredNgExpressEngine = express_engine_1.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
    ]
});
var server = express();
server.engine('html', configuredNgExpressEngine);
server.set('view engine', 'html');
server.set('views', DIST_BROWSER_FOLDER);
var options = {
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
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.ApplicationModule, server)];
                case 1:
                    app = _a.sent();
                    return [4 /*yield*/, app.listen(8000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
//# sourceMappingURL=server.js.map
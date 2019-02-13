"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_common_1 = require("ims-common");
const https = require("https");
const http = require("http");
exports.HttpOptions = ims_core_1.InjectionToken.fromString("HttpOptions");
exports.HttpServer = ims_core_1.InjectionToken.fromString("HttpServer");
let HttpModule = class HttpModule {
};
HttpModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: exports.HttpServer,
                useFactory: async (injector) => {
                    const options = (await injector.get(exports.HttpOptions)) || {};
                    return options.key && options.cert
                        ? https.createServer(options)
                        : http.createServer();
                }
            }
        ]
    })
], HttpModule);
exports.HttpModule = HttpModule;

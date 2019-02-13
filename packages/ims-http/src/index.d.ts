/// <reference types="node" />
import { InjectionToken } from "ims-core";
import https = require("https");
import http = require("http");
export interface HttpOptions extends https.ServerOptions {
}
export declare const HttpOptions: InjectionToken<HttpOptions>;
export declare type HttpServer = http.Server | https.Server;
export declare const HttpServer: InjectionToken<HttpServer>;
export declare class HttpModule {
}
//# sourceMappingURL=index.d.ts.map
import { InjectionToken, Injector } from "ims-core";
import { Module } from "ims-common";
import https = require("https");
import http = require("http");

export interface HttpOptions extends https.ServerOptions {}
export const HttpOptions = InjectionToken.fromString<HttpOptions>(
  "HttpOptions"
);
export type HttpServer = http.Server | https.Server;
export const HttpServer = InjectionToken.fromString<HttpServer>("HttpServer");

@Module({
  providers: [
    {
      provide: HttpServer,
      useFactory: async (injector: Injector) => {
        const options = (await injector.get(HttpOptions)) || {};
        return options.key && options.cert
          ? https.createServer(options)
          : http.createServer();
      }
    }
  ]
})
export class HttpModule {}

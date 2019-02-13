import { InjectionToken, Injector, Record } from "ims-core";

export interface ApiAddress {
  family: "ipv4" | "ipv6";
  host: string;
  transport: "tcp" | "http" | "socket" | "utp" | "udp";
  port?: number;
}

export abstract class ImsApi {
  constructor(public injector: Injector) {}
  abstract create(addr: ApiAddress, tokens: InjectionToken[]): Promise<void>;
}

export class ImsApiHttpClient extends ImsApi {
  async create(addr: ApiAddress, tokens: InjectionToken[]): Promise<void> {
    await Promise.all(
      tokens.map(async token => {
        const hash = await token.hash;
        const baseUrl = `http://${addr.host}:${addr.port}/${hash}/`;
        this.injector.set(token, {
          fn: async (injector: Injector) => {
            return new Proxy(function() {}, {
              get(target: any, p: PropertyKey, receiver: any) {
                let url = `${baseUrl}/${p as string}`;
                return new Proxy(function() {}, {
                  apply(target: any, thisArg: any, argArray?: any) {
                    return fetch(url, {
                      method: "POST",
                      body: JSON.stringify(argArray)
                    }).then(res => {
                      try {
                        return res.json();
                      } catch (e) {
                        return res.text();
                      }
                    });
                  }
                });
              }
            });
          },
          useCache: true,
          value: undefined,
          token
        });
      })
    );
  }
}

import express = require("express");
export class ImsApiHttpServer extends ImsApi {
  async create(addr: ApiAddress, tokens: InjectionToken[]): Promise<void> {
    const app = express();
    await Promise.all(
      tokens.map(async token => {
        const hash = await token.hash;
        const router = express.Router();
        router.all(hash, (req, res, next) => {
          res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
          });
          res.send(hash);
        });
        app.use("api", router);
      })
    );
    app.listen(addr.port, addr.host);
  }
}

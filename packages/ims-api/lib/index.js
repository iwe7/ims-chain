"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsApi {
    constructor(injector) {
        this.injector = injector;
    }
}
exports.ImsApi = ImsApi;
class ImsApiHttpClient extends ImsApi {
    async create(addr, tokens) {
        await Promise.all(tokens.map(async (token) => {
            const hash = await token.hash;
            const baseUrl = `http://${addr.host}:${addr.port}/${hash}/`;
            this.injector.set(token, {
                fn: async (injector) => {
                    return new Proxy(function () { }, {
                        get(target, p, receiver) {
                            let url = `${baseUrl}/${p}`;
                            return new Proxy(function () { }, {
                                apply(target, thisArg, argArray) {
                                    return fetch(url, {
                                        method: "POST",
                                        body: JSON.stringify(argArray)
                                    }).then(res => {
                                        try {
                                            return res.json();
                                        }
                                        catch (e) {
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
        }));
    }
}
exports.ImsApiHttpClient = ImsApiHttpClient;
const express = require("express");
class ImsApiHttpServer extends ImsApi {
    async create(addr, tokens) {
        const app = express();
        await Promise.all(tokens.map(async (token) => {
            const hash = await token.hash;
            const router = express.Router();
            router.all(hash, (req, res, next) => {
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8"
                });
                res.send(hash);
            });
            app.use("api", router);
        }));
        app.listen(addr.port, addr.host);
    }
}
exports.ImsApiHttpServer = ImsApiHttpServer;

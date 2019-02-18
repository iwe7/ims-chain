"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const path_1 = require("path");
const root = process.cwd();
const cfg = require(path_1.join(root, 'config/ipns.json'));
const obs = new rxjs_1.Subject();
let ws;
function create(hash, pro) {
    return new Proxy(function () { }, {
        get(target, p, receiver) {
            if (p === "then") {
                return void 0;
            }
            return create(hash, `${pro}.${p}`);
        },
        apply(target, thisArg, argArray) {
            ws.send(JSON.stringify({
                hash,
                method: pro,
                params: argArray
            }));
            return obs.pipe(operators_1.filter((res) => {
                return res.type === `${hash}.${pro}`;
            }), operators_1.map((res) => res.data), operators_1.tap(res => console.log(res)));
        }
    });
}
let ImsCloudClient = class ImsCloudClient {
};
ImsCloudClient = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    let routes = await injector.get(ims_common_1.Routes);
                    ws = new WebSocket(`wss://${cfg.wsUrl}`);
                    ws.onmessage = (evt) => {
                        const data = JSON.parse(evt.data);
                        obs.next(data);
                    };
                    await new Promise((resolve, reject) => {
                        ws.onopen = (evt) => {
                            resolve();
                        };
                    });
                    if (Array.isArray(routes)) {
                        for (let route of routes) {
                            injector.set(route, {
                                fn: async (injector) => {
                                    let hash = await route.hash;
                                    return new Proxy(function () { }, {
                                        get(target, p, receiver) {
                                            if (p === "then") {
                                                return void 0;
                                            }
                                            return create(hash, `${p}`);
                                        }
                                    });
                                },
                                token: route,
                                useCache: true,
                                value: undefined
                            });
                        }
                    }
                }
            }
        ]
    })
], ImsCloudClient);
exports.ImsCloudClient = ImsCloudClient;

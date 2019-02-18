"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_cloud_1 = require("ims-cloud");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const obs = new rxjs_1.Subject();
let ws;
function create(config, hash, pro) {
    return new Proxy(function () { }, {
        get(target, p, receiver) {
            if (p === "then") {
                return void 0;
            }
            return create(config, hash, `${pro}.${p}`);
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
let ImsCloudClientModule = class ImsCloudClientModule {
};
ImsCloudClientModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    let routes = await injector.get(ims_cloud_1.Routes);
                    let config = await injector.get(ims_cloud_1.Config);
                    ws = new WebSocket(`wss://viveka.cn/ws/`);
                    ws.onmessage = (evt) => {
                        const data = JSON.parse(evt.data);
                        obs.next(data);
                    };
                    await new Promise((resolve, reject) => {
                        ws.onopen = (evt) => {
                            resolve();
                        };
                    });
                    if (!config)
                        config = { port: 4801, host: "localhost" };
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
                                            return create(config, hash, `${p}`);
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
            },
            {
                provide: ims_cloud_1.Fetch,
                useFactory: () => fetch
            },
            {
                provide: ims_cloud_1.Config,
                useFactory: () => {
                    return {
                        host: "./api"
                    };
                }
            }
        ]
    })
], ImsCloudClientModule);
exports.ImsCloudClientModule = ImsCloudClientModule;

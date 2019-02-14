"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_cloud_1 = require("ims-cloud");
function create(config, hash, pro) {
    return new Proxy(function () { }, {
        get(target, p, receiver) {
            if (p === "then") {
                return void 0;
            }
            return create(config, hash, `${pro}.${p}`);
        },
        apply(target, thisArg, argArray) {
            let url = ``;
            if (config) {
                if (config.host) {
                    url += config.host;
                }
                else {
                    url += ".";
                }
                if (config.port) {
                    url += `:` + config.port;
                }
            }
            url += `/${hash}/${pro}`;
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_cloud_server_1 = require("ims-cloud-server");
const ims_common_1 = require("ims-common");
const ims_ipfs_1 = require("ims-ipfs");
const ims_core_1 = require("ims-core");
const ims_cloud_1 = require("ims-cloud");
const fs_1 = require("./fs");
const IPFS = require("ipfs");
let ImsIpfsServerModule = class ImsIpfsServerModule {
};
ImsIpfsServerModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_ipfs_1.IpfsApi,
                useFactory: (injector) => new fs_1.ImsFsServer(injector)
            },
            {
                provide: ims_cloud_1.Get,
                useFactory: async (injector) => {
                    let api = await injector.get(ims_core_1.InjectionToken.fromType(fs_1.ImsFsServer));
                    return {
                        path: "/:hash/:method?",
                        handler: async (req, res, next) => {
                            let params = req.params;
                            if (params.hash) {
                                return await api.cat(params.hash);
                            }
                            next();
                        }
                    };
                }
            },
            {
                provide: ims_ipfs_1.IpfsConfig,
                useFactory: () => {
                    return {
                        repo: "./data",
                        preload: {
                            enabled: true,
                            addresses: [
                                "/ip4/121.42.158.224/tcp/4001/ipfs/QmUxa7SUbHu4p2TtwDYLcHjQn2HqdMYpQn1paKpsP7tKao"
                            ]
                        }
                    };
                }
            },
            {
                provide: ims_ipfs_1.Ipfs,
                useFactory: async (injector) => {
                    let config = await injector.get(ims_ipfs_1.IpfsConfig);
                    if (!config) {
                        throw new Error(`ipfs config is needed`);
                    }
                    return new Promise((resolve, reject) => {
                        let node = new IPFS(config);
                        console.log("create ipfs node");
                        node.on("ready", (err) => {
                            if (err)
                                return reject(err);
                            console.log("ipfs node ready");
                            resolve(node);
                        });
                        node.on("error", (err) => {
                            reject(err);
                        });
                    });
                },
                cache: true
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    console.log("ipfs started");
                    return await injector.get(ims_ipfs_1.Ipfs);
                }
            },
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => ims_ipfs_1.IpfsApi
            }
        ],
        imports: [ims_cloud_server_1.ImsCloudServerModule]
    })
], ImsIpfsServerModule);
exports.ImsIpfsServerModule = ImsIpfsServerModule;

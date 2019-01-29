"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_cloud_client_1 = require("ims-cloud-client");
const ims_common_1 = require("ims-common");
const ims_cloud_1 = require("ims-cloud");
const ims_ipfs_1 = require("ims-ipfs");
let ImsIpfsClientModule = class ImsIpfsClientModule {
};
ImsIpfsClientModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => ims_ipfs_1.IpfsApi
            },
            {
                provide: ims_cloud_1.Config,
                useFactory: () => {
                    return {
                        host: "localhost",
                        port: 4802
                    };
                }
            },
            {
                provide: ims_cloud_1.Fetch,
                useFactory: () => require("node-fetch")
            }
        ],
        imports: [ims_cloud_client_1.ImsCloudClientModule]
    })
], ImsIpfsClientModule);
exports.ImsIpfsClientModule = ImsIpfsClientModule;

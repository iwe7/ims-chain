"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_sdk_1 = require("ims-sdk");
const ims_sdk_h5_1 = require("ims-sdk-h5");
const ims_common_2 = require("ims-common");
const React = require("react");
require("./index.scss");
const ims_web_1 = require("ims-web");
const ims_cloud_1 = require("ims-cloud");
const ims_cloud_client_1 = require("ims-cloud-client");
class AppIndex extends React.Component {
    async go() {
        const sdk = await ims_core_1.Injector.get(ims_sdk_1.ImsSdk);
        sdk.navigateTo('/home');
    }
    render() {
        return React.createElement("div", null,
            "AppIndex \u9996\u9875",
            React.createElement("button", { onClick: e => {
                    this.go();
                } }, "AppHome"));
    }
}
exports.AppIndex = AppIndex;
class AppHome extends React.Component {
    async go() {
        const sdk = await ims_core_1.Injector.get(ims_sdk_1.ImsSdk);
        sdk.navigateTo('/');
    }
    render() {
        return React.createElement("div", null,
            "AppHome \u4E2A\u4EBA\u4E2D\u5FC3",
            React.createElement("button", { onClick: e => {
                    this.go();
                } }, "AppIndex"));
    }
}
exports.AppHome = AppHome;
let ImsPlatformReact = class ImsPlatformReact {
};
ImsPlatformReact = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [
            ims_cloud_client_1.ImsCloudClientModule
        ],
        providers: [
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => [
                    ims_common_2.InjectionToken.fromType(ims_web_1.ImsUser),
                    ims_common_2.InjectionToken.fromType(ims_web_1.ImsIpfs)
                ]
            },
            {
                provide: ims_common_2.InjectionToken.fromType(ims_sdk_1.ImsSdk),
                useFactory: async (injector) => {
                    return await injector.get(ims_sdk_h5_1.ImsSdkH5);
                }
            },
            {
                provide: ims_common_1.Page,
                useFactory: () => {
                    return {
                        path: '/',
                        component: AppIndex,
                        title: '首页'
                    };
                }
            },
            {
                provide: ims_common_1.Page,
                useFactory: () => {
                    return {
                        path: '/home',
                        component: AppHome,
                        title: '我的'
                    };
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    const sdk = await injector.get(ims_sdk_1.ImsSdk);
                    await sdk.ready();
                }
            }
        ]
    })
], ImsPlatformReact);
exports.ImsPlatformReact = ImsPlatformReact;
ims_common_1.bootstrapModule(ImsPlatformReact);

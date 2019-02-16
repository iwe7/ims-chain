"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_sdk_1 = require("ims-sdk");
const ims_sdk_h5_1 = require("ims-sdk-h5");
const ims_common_2 = require("ims-common");
const React = require("react");
const bootstrap_1 = require("./bootstrap");
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
        providers: [
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
                        component: AppIndex
                    };
                }
            },
            {
                provide: ims_common_1.Page,
                useFactory: () => {
                    return {
                        path: '/home',
                        component: AppHome
                    };
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    const pages = await injector.get(ims_common_1.Page);
                    bootstrap_1.bootstrap(pages, injector, document.getElementById('app'));
                }
            }
        ]
    })
], ImsPlatformReact);
exports.ImsPlatformReact = ImsPlatformReact;
ims_common_1.bootstrapModule(ImsPlatformReact);

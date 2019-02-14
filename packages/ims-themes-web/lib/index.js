"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const react_dom_1 = require("react-dom");
require("antd/dist/antd.css");
require("./index.scss");
const index_1 = require("./common/index");
const user_1 = require("./user");
const home = require("./home");
const ims_web_1 = require("ims-web");
const ims_cloud_client_1 = require("ims-cloud-client");
const ims_cloud_1 = require("ims-cloud");
const react_router_dom_1 = require("react-router-dom");
const React = require("react");
let ImsThemesWeb = class ImsThemesWeb {
};
ImsThemesWeb = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => [ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser)]
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    react_dom_1.render(React.createElement(react_router_dom_1.BrowserRouter, null,
                        React.createElement("div", { className: "app" },
                            React.createElement(react_router_dom_1.Switch, null,
                                React.createElement(index_1.ImsCommonContent, null,
                                    React.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: home.ImsHomeWelcome }),
                                    React.createElement(react_router_dom_1.Route, { path: "/user/login", component: user_1.ImsUserLogin }),
                                    React.createElement(react_router_dom_1.Route, { path: "/user/register", component: user_1.ImsUserRegister }),
                                    React.createElement(react_router_dom_1.Route, { path: "/user/findPassword", component: user_1.ImsUserFindPassword }))))), document.getElementById("app"));
                }
            }
        ],
        imports: [ims_cloud_client_1.ImsCloudClientModule]
    })
], ImsThemesWeb);
exports.ImsThemesWeb = ImsThemesWeb;
ims_common_1.bootstrapModule(ImsThemesWeb);

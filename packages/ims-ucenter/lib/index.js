"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const react_dom_1 = require("react-dom");
const React = require("react");
const pages_1 = require("./pages");
let ImsUcenterModule = class ImsUcenterModule {
};
ImsUcenterModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [{
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    react_dom_1.render(React.createElement(pages_1.ImsUcenter, null), document.getElementById('app'));
                }
            }],
        imports: []
    })
], ImsUcenterModule);
exports.ImsUcenterModule = ImsUcenterModule;
ims_common_1.bootstrapModule(ImsUcenterModule);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_webpack_1 = require("ims-webpack");
const path = require("path");
let ImsAdminBuildModule = class ImsAdminBuildModule {
};
ImsAdminBuildModule = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [ims_webpack_1.ImsWebpackModule],
        providers: [
            {
                provide: ims_webpack_1.WebpackMain,
                useFactory: () => [path.join(__dirname, "index.tsx")]
            }
        ]
    })
], ImsAdminBuildModule);
exports.ImsAdminBuildModule = ImsAdminBuildModule;
ims_common_1.bootstrapModule(ImsAdminBuildModule);

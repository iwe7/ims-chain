"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_orm_1 = require("ims-orm");
const index_1 = require("./mdoules/index");
let ImsAddonsModule = class ImsAddonsModule {
};
ImsAddonsModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_orm_1.ImsOrmConnectionOptions,
                useFactory: () => {
                    return {
                        entities: [
                            index_1.ImsModules,
                            index_1.ImsModulesBindings,
                            index_1.ImsModulesIgnore,
                            index_1.ImsModulesCloud,
                            index_1.ImsModulesPlugin,
                            index_1.ImsModulesRank,
                            index_1.ImsModulesRecycle
                        ]
                    };
                }
            }
        ],
        imports: [
            ims_orm_1.ImsOrmModule
        ]
    })
], ImsAddonsModule);
exports.ImsAddonsModule = ImsAddonsModule;
tslib_1.__exportStar(require("./mdoules/index"), exports);

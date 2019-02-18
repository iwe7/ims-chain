"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const index_1 = require("./index");
const typeorm_1 = require("typeorm");
let ImsTest = class ImsTest {
    constructor(modules, modulesBindings) {
        this.modules = modules;
        this.modulesBindings = modulesBindings;
    }
};
ImsTest = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__param(0, ims_common_1.Entry(index_1.ImsModules)),
    tslib_1.__param(1, ims_common_1.Entry(index_1.ImsModulesBindings)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ImsTest);
exports.ImsTest = ImsTest;
ims_common_1.bootstrapModule(index_1.ImsAddonsModule).then(async (res) => {
    const test = await res.injector.get(ImsTest);
    debugger;
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModulesPlugin = class ImsModulesPlugin {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesPlugin.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesPlugin.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesPlugin.prototype, "main_module", void 0);
ImsModulesPlugin = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules_plugin'
    })
], ImsModulesPlugin);
exports.ImsModulesPlugin = ImsModulesPlugin;

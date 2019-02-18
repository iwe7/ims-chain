"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModulesRecycle = class ImsModulesRecycle {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesRecycle.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 255
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesRecycle.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'tinyint'
    }),
    tslib_1.__metadata("design:type", Number)
], ImsModulesRecycle.prototype, "type", void 0);
ImsModulesRecycle = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules_recycle'
    })
], ImsModulesRecycle);
exports.ImsModulesRecycle = ImsModulesRecycle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModulesIgnore = class ImsModulesIgnore {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesIgnore.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesIgnore.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 15
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesIgnore.prototype, "version", void 0);
ImsModulesIgnore = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules_ignore'
    })
], ImsModulesIgnore);
exports.ImsModulesIgnore = ImsModulesIgnore;

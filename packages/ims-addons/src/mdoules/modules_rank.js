"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModulesRank = class ImsModulesRank {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesRank.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesRank.prototype, "module_name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesRank.prototype, "uid", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesRank.prototype, "rank", void 0);
ImsModulesRank = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules_rank'
    })
], ImsModulesRank);
exports.ImsModulesRank = ImsModulesRank;

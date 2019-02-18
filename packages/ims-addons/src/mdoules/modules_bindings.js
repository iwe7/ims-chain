"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModulesBindings = class ImsModulesBindings {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({
        generated: true,
        type: 'int'
    }),
    tslib_1.__metadata("design:type", Number)
], ImsModulesBindings.prototype, "eid", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "module", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 30
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "entry", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 50
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "call", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 50
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 200
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "do", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 200
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "state", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesBindings.prototype, "direct", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 255
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "url", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 255
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesBindings.prototype, "icon", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesBindings.prototype, "displayorder", void 0);
ImsModulesBindings = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules_bindings'
    })
], ImsModulesBindings);
exports.ImsModulesBindings = ImsModulesBindings;

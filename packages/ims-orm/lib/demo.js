"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsDemo = class ImsDemo {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsDemo.prototype, "uid", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], ImsDemo.prototype, "username", void 0);
ImsDemo = tslib_1.__decorate([
    typeorm_1.Entity()
], ImsDemo);
exports.ImsDemo = ImsDemo;

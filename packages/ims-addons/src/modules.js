"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModules = class ImsModules {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({
        generated: true,
        type: 'int'
    }),
    tslib_1.__metadata("design:type", Number)
], ImsModules.prototype, "mid", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 20
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 15
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "version", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 500
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "ability", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 1000
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 50
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "author", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 255
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "url", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "settings", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 500
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "subscribes", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 500
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "handles", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 10,
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "target", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'text'
    }),
    tslib_1.__metadata("design:type", String)
], ImsModules.prototype, "permissions", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "isrulefields", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "issystem", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "iscard", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "title_initial", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "wxapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "welcome_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "oauth_type", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "webapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "phoneapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "xzapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModules.prototype, "aliapp_support", void 0);
ImsModules = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules'
    })
], ImsModules);
exports.ImsModules = ImsModules;

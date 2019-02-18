"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsModulesCloud = class ImsModulesCloud {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesCloud.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesCloud.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesCloud.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "title_initial", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesCloud.prototype, "logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 10
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesCloud.prototype, "version", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        type: 'tinyint'
    }),
    tslib_1.__metadata("design:type", Number)
], ImsModulesCloud.prototype, "install_status", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "account_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "wxapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "webapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "phoneapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "welcome_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "xzapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "aliapp_support", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesCloud.prototype, "cloud_id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesCloud.prototype, "main_module_name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 100,
    }),
    tslib_1.__metadata("design:type", String)
], ImsModulesCloud.prototype, "main_module_logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "has_new_version", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "has_new_branch", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Boolean)
], ImsModulesCloud.prototype, "is_ban", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], ImsModulesCloud.prototype, "lastupdatetime", void 0);
ImsModulesCloud = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_modules_cloud'
    })
], ImsModulesCloud);
exports.ImsModulesCloud = ImsModulesCloud;

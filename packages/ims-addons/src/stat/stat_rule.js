"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsStatRule = class ImsStatRule {
};
ImsStatRule = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_stat_rule'
    })
], ImsStatRule);
exports.ImsStatRule = ImsStatRule;

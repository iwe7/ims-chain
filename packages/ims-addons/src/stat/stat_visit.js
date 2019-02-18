"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ImsStatVisit = class ImsStatVisit {
};
ImsStatVisit = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'ims_stat_visit'
    })
], ImsStatVisit);
exports.ImsStatVisit = ImsStatVisit;

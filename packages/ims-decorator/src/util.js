"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNumber(val) {
    return typeof val === "number";
}
exports.isNumber = isNumber;
function isUndefined(val) {
    return val === undefined;
}
exports.isUndefined = isUndefined;
require("reflect-metadata");
const _getMetadata = (type) => (v, key) => {
    return Reflect.getMetadata(type, v, key);
};
exports.getDesignParamTypes = _getMetadata("design:paramtypes");
exports.getDesignReturnType = _getMetadata("design:returntype");
exports.getDesignType = _getMetadata("design:type");

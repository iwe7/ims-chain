"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClosureSafeProperty(objWithPropertyToExtract) {
    for (let key in objWithPropertyToExtract) {
        if (objWithPropertyToExtract[key] === getClosureSafeProperty) {
            return key;
        }
    }
    throw Error("Could not find renamed property on target object.");
}
exports.getClosureSafeProperty = getClosureSafeProperty;
function isFunction(val) {
    return typeof val === "function";
}
exports.isFunction = isFunction;
function isPromise(val) {
    return val && typeof val.then === "function";
}
exports.isPromise = isPromise;

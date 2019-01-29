"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataType;
(function (MetadataType) {
    MetadataType[MetadataType["class"] = 0] = "class";
    MetadataType[MetadataType["constructor"] = 1] = "constructor";
    MetadataType[MetadataType["parameter"] = 2] = "parameter";
    MetadataType[MetadataType["method"] = 3] = "method";
    MetadataType[MetadataType["property"] = 4] = "property";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
class MetadataFactory {
}
exports.MetadataFactory = MetadataFactory;
function getMethodDef(def, p) {
    return def.methods.filter(res => res.propertyKey === p);
}
exports.getMethodDef = getMethodDef;
function getPropertyDef(def, p) {
    return def.propertys.filter(res => res.propertyKey === p);
}
exports.getPropertyDef = getPropertyDef;

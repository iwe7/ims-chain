"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
require("reflect-metadata");
const type_1 = require("./type");
const constructorMap = new Map();
const parametersMap = new Map();
const propertysMap = new Map();
const methodsMap = new Map();
const classMap = new Map();
function makeDecorator(token, getDef, factory) {
    let item = (metadataDef) => {
        return (target, propertyKey, descriptorOrParameterIndex) => {
            let res;
            if (util_1.isNumber(descriptorOrParameterIndex)) {
                if (util_1.isUndefined(propertyKey)) {
                    let paramTypes = util_1.getDesignParamTypes(target);
                    if (!constructorMap.has(target)) {
                        constructorMap.set(target, new Set());
                    }
                    let def = {
                        metadataType: type_1.MetadataType.constructor,
                        metadataDef,
                        target,
                        token,
                        parameterIndex: descriptorOrParameterIndex,
                        parameterType: paramTypes[descriptorOrParameterIndex]
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    constructorMap.set(target, constructorMap.get(target).add(def));
                }
                else {
                    let paramTypes = util_1.getDesignParamTypes(target, propertyKey) || [];
                    target = target.constructor;
                    if (!parametersMap.has(target)) {
                        parametersMap.set(target, new Set());
                    }
                    let def = {
                        metadataType: type_1.MetadataType.parameter,
                        metadataDef,
                        target,
                        token,
                        propertyKey,
                        parameterIndex: descriptorOrParameterIndex,
                        parameterType: paramTypes[descriptorOrParameterIndex]
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    parametersMap.set(target, parametersMap.get(target).add(def));
                }
            }
            else if (util_1.isUndefined(descriptorOrParameterIndex)) {
                if (util_1.isUndefined(propertyKey)) {
                    let parameters = util_1.getDesignParamTypes(target) || [];
                    parameters = parameters.map((param, index) => {
                        return {
                            parameterIndex: index,
                            parameterType: param
                        };
                    });
                    if (!classMap.has(target)) {
                        classMap.set(target, new Set());
                    }
                    let propertys = [];
                    let methods = [];
                    constructorMap.has(target) &&
                        constructorMap.get(target).forEach(item => {
                            parameters[item.parameterIndex] = item;
                        });
                    propertysMap.has(target) &&
                        propertysMap.get(target).forEach(item => {
                            propertys.push(item);
                        });
                    methodsMap.has(target) &&
                        methodsMap.get(target).forEach(item => {
                            methods.push(item);
                        });
                    let def = {
                        metadataType: type_1.MetadataType.class,
                        metadataDef,
                        target,
                        token,
                        parameters,
                        propertys,
                        methods
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    res = factory && factory.type(def);
                }
                else {
                    let designType = util_1.getDesignType(target, propertyKey);
                    target = target.constructor;
                    if (!propertysMap.has(target)) {
                        propertysMap.set(target, new Set());
                    }
                    let def = {
                        metadataType: type_1.MetadataType.class,
                        metadataDef,
                        target,
                        token,
                        propertyKey,
                        propertyType: designType
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    propertysMap.set(target, propertysMap.get(target).add(def));
                }
            }
            else {
                target = target.constructor;
                if (!methodsMap.has(target)) {
                    methodsMap.set(target, new Set());
                }
                let parameters = [];
                parametersMap.get(target).forEach(parameter => {
                    if (parameter.propertyKey === propertyKey) {
                        parameters.push(parameter);
                    }
                });
                let returnType = util_1.getDesignReturnType(target, propertyKey);
                let def = {
                    metadataType: type_1.MetadataType.method,
                    metadataDef,
                    target,
                    token,
                    parameters,
                    propertyKey: propertyKey,
                    returnType: returnType
                };
                def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                methodsMap.set(target, methodsMap.get(target).add(def));
            }
            return res;
        };
    };
    return item;
}
exports.makeDecorator = makeDecorator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const type_1 = require("./type");
const MakeDecoratorCache = new Map();
function makeDecorator(token, getDef, factory) {
    let constructorParameter = [];
    let parameters = [];
    let propertys = [];
    let methods = [];
    let item = (metadataDef) => {
        return (target, propertyKey, descriptorOrParameterIndex) => {
            let res;
            if (util_1.isNumber(descriptorOrParameterIndex)) {
                if (util_1.isUndefined(propertyKey)) {
                    if (!MakeDecoratorCache.has(target)) {
                        MakeDecoratorCache.set(target, {
                            constructorParameter,
                            parameters,
                            propertys,
                            methods
                        });
                    }
                    let config = MakeDecoratorCache.get(target);
                    let def = {
                        metadataType: type_1.MetadataType.constructor,
                        metadataDef,
                        target,
                        token,
                        parameterIndex: descriptorOrParameterIndex
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    config.constructorParameter.push(def);
                    MakeDecoratorCache.set(target, config);
                }
                else {
                    target = target.constructor;
                    if (!MakeDecoratorCache.has(target)) {
                        MakeDecoratorCache.set(target, {
                            constructorParameter,
                            parameters,
                            propertys,
                            methods
                        });
                    }
                    let config = MakeDecoratorCache.get(target);
                    let def = {
                        metadataType: type_1.MetadataType.parameter,
                        metadataDef,
                        target,
                        token,
                        propertyKey,
                        parameterIndex: descriptorOrParameterIndex
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    config.parameters.push(def);
                    MakeDecoratorCache.set(target, config);
                }
            }
            else if (util_1.isUndefined(descriptorOrParameterIndex)) {
                if (util_1.isUndefined(propertyKey)) {
                    if (!MakeDecoratorCache.has(target)) {
                        MakeDecoratorCache.set(target, {
                            constructorParameter,
                            parameters,
                            propertys,
                            methods
                        });
                    }
                    let config = MakeDecoratorCache.get(target);
                    let def = {
                        metadataType: type_1.MetadataType.class,
                        metadataDef,
                        target,
                        token,
                        parameters: config.constructorParameter,
                        propertys: config.propertys,
                        methods: config.methods
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    res = factory && factory.type(def);
                }
                else {
                    target = target.constructor;
                    if (!MakeDecoratorCache.has(target)) {
                        MakeDecoratorCache.set(target, {
                            constructorParameter,
                            parameters,
                            propertys,
                            methods
                        });
                    }
                    let config = MakeDecoratorCache.get(target);
                    let def = {
                        metadataType: type_1.MetadataType.class,
                        metadataDef,
                        target,
                        token,
                        propertyKey
                    };
                    def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                    config.propertys.push(def);
                    MakeDecoratorCache.set(target, config);
                }
            }
            else {
                target = target.constructor;
                if (!MakeDecoratorCache.has(target)) {
                    MakeDecoratorCache.set(target, {
                        constructorParameter,
                        parameters,
                        propertys,
                        methods
                    });
                }
                let config = MakeDecoratorCache.get(target);
                let def = {
                    metadataType: type_1.MetadataType.method,
                    metadataDef,
                    target,
                    token,
                    parameters: config.parameters,
                    propertyKey: propertyKey
                };
                def.metadataDef = !!getDef ? getDef(def) : metadataDef;
                config.methods.push(def);
                config.parameters = [];
                MakeDecoratorCache.set(target, config);
            }
            return res;
        };
    };
    return item;
}
exports.makeDecorator = makeDecorator;
//# sourceMappingURL=makeDecorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
exports.INJECTABLE = ims_core_1.InjectionToken.fromString("injectable");
class InjectableMetadataFactory extends ims_decorator_1.MetadataFactory {
    type(def) {
        let opt = def.metadataDef || {};
        let params = new Array(def.target.length);
        let token = opt.provide || ims_core_1.InjectionToken.fromType(def.target);
        if (opt && opt.useFactory) {
            let provider = {
                provide: token,
                useFactory: opt.useFactory,
                deps: opt.deps || [],
                cache: !!opt.useCache
            };
            ims_core_1.Injector.top.handlerStaticProvider(provider);
        }
        else {
            opt = opt || {
                deps: []
            };
            let provider = {
                provide: token,
                useFactory: async (injector) => {
                    for (let param of def.parameters) {
                        const token = await injector.get(param.token);
                        if (token) {
                            params[param.parameterIndex] = await token(param);
                        }
                        else {
                            params[param.parameterIndex] = await injector.get(param.metadataDef || param.parameterType);
                        }
                    }
                    return new def.target(...params);
                },
                deps: opt.deps || [],
                cache: !!opt.useCache
            };
            ims_core_1.Injector.top.handlerStaticProvider(provider);
        }
        return def.target;
    }
}
exports.InjectableMetadataFactory = InjectableMetadataFactory;
exports.Injectable = ims_decorator_1.makeDecorator(exports.INJECTABLE, def => {
    return def.metadataDef;
}, new InjectableMetadataFactory());

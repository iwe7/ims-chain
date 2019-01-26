"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_core_1 = require("ims-core");
exports.MODULE = ims_core_1.InjectionToken.fromString("module");
exports.Symbol_Module_Init = Symbol.for("Symbol_Module_Init");
class ModuleMetadataFactory {
    type(def) {
        return new Proxy(def.target, {
            construct(target, argArray, newTarget) {
                let getImports = async (injector) => {
                    let options = def.metadataDef;
                    if (options) {
                        let imports = [];
                        let providers = [];
                        providers = providers.concat(options.providers || []);
                        imports = imports.concat(options.imports || []);
                        if (imports && imports.length > 0) {
                            for (let i of imports) {
                                let t = await ModuleFactory.create(i, injector);
                                t.injector.records.forEach((it, key) => {
                                    injector.records.set(key, it);
                                });
                            }
                        }
                        for (let i of providers) {
                            await injector.handlerStaticProvider(i);
                        }
                    }
                };
                let instance = Reflect.construct(target, argArray, newTarget);
                return new ModuleRef(instance, getImports);
            }
        });
    }
}
exports.ModuleMetadataFactory = ModuleMetadataFactory;
class ModuleRef {
    constructor(instance, onInit, _injector) {
        this.instance = instance;
        this.onInit = onInit;
        this._injector = _injector;
    }
    get injector() {
        return this._injector;
    }
    setInjector(injector) {
        this._injector = injector;
    }
}
exports.ModuleRef = ModuleRef;
class ModuleFactory {
    static async create(type, injector) {
        let instance = new type();
        injector = injector || (await ims_core_1.Injector.create([]));
        instance.onInit && (await instance.onInit(injector));
        instance.setInjector(injector);
        return instance;
    }
}
exports.ModuleFactory = ModuleFactory;
exports.Module = ims_decorator_1.makeDecorator(exports.MODULE, def => {
    return def.metadataDef;
}, new ModuleMetadataFactory());
//# sourceMappingURL=module.js.map
import { ClassMetadata, MetadataFactory } from "ims-decorator";
import { InjectionToken, Type, StaticProvider, Injector } from "ims-core";
export interface Module {
    providers?: StaticProvider[];
    imports?: Type<any>[];
}
export declare const MODULE: InjectionToken<any>;
export declare const Symbol_Module_Init: unique symbol;
export declare class ModuleMetadataFactory implements MetadataFactory {
    type(def: ClassMetadata<Module>): any;
}
export declare class ModuleRef<T> {
    instance: T;
    onInit: (injector: Injector) => Promise<void>;
    private _injector?;
    readonly injector: Injector;
    constructor(instance: T, onInit: (injector: Injector) => Promise<void>, _injector?: Injector);
    setInjector(injector: Injector): void;
}
export declare class ModuleFactory {
    static create<T = any>(type: Type<any>, injector?: Injector): Promise<ModuleRef<T>>;
}
export declare const Module: import("../../ims-decorator/src/makeDecorator").IDecorator<Module>;
//# sourceMappingURL=module.d.ts.map
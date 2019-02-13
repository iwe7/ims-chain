import { InjectionToken } from "./injection_token";
import { Injector } from "./injector";
import { Type } from "./type";
export interface FactorySansProvider {
    useFactory: (injector: Injector) => any;
    cache?: boolean;
}
export interface FactoryProvider extends FactorySansProvider {
    provide: InjectionToken;
}
export interface StaticProviderFn {
    (injector: Injector): Promise<StaticProvider>;
}
export declare function isStaticProviderFn(val: any): val is StaticProviderFn;
export declare type StaticProvider = FactoryProvider | StaticProviderFn;
export declare function isFactoryProvider(val: any): val is FactoryProvider;
export declare type Provider = FactoryProvider | Type<any>;
//# sourceMappingURL=provider.d.ts.map
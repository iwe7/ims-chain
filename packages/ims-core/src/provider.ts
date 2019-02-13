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

export function isStaticProviderFn(val: any): val is StaticProviderFn {
  return typeof val === "function";
}

export type StaticProvider = FactoryProvider | StaticProviderFn;

export function isFactoryProvider(val: any): val is FactoryProvider {
  return Reflect.has(val, "provide") && Reflect.has(val, "useFactory");
}

export type Provider = FactoryProvider | Type<any>;

import { InjectionToken } from "./injection_token";
import { Injector } from "./injector";
export interface FactorySansProvider {
  useFactory: (injector: Injector) => any;
  deps: InjectionToken[];
  cache?: boolean;
}
export interface FactoryProvider extends FactorySansProvider {
  provide: InjectionToken;
  multi?: boolean;
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

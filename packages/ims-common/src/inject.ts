import { makeDecorator } from "ims-decorator";
import { InjectionToken, Type } from "ims-core";
export const INJECT = InjectionToken.fromString("INJECT");
export type Inject<T = any> = Type<T> | InjectionToken<T> | string;
export const Inject = makeDecorator<Inject>(INJECT);

import { makeDecorator } from "ims-decorator";
import { InjectionToken, Type, Injector } from "ims-core";
export const ENTRY = InjectionToken.fromString("ENTRY");
export type Entry<T = any> = Type<T> | InjectionToken<T> | string;
export const Entry = makeDecorator<Entry>(ENTRY);

import { InjectionToken, Type } from "ims-core";
export declare const INJECT: InjectionToken<any>;
export declare type Inject<T = any> = Type<T> | InjectionToken<T> | string;
export declare const Inject: import("../../ims-decorator/src/makeDecorator").IDecorator<string | InjectionToken<any> | Type<any>>;
//# sourceMappingURL=inject.d.ts.map
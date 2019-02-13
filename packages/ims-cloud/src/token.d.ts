import { InjectionToken } from "ims-core";
export declare const Routes: InjectionToken<InjectionToken<any>[]>;
export interface Config {
    port: number;
    host: string;
}
export declare const Config: InjectionToken<Config>;
export declare const Fetch: InjectionToken<typeof fetch>;
export declare const Router: InjectionToken<any>;
//# sourceMappingURL=token.d.ts.map
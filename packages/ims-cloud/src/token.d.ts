import { InjectionToken } from "ims-core";
export declare const Routes: InjectionToken<InjectionToken<any>[]>;
export interface Config {
    port: number;
    host: string;
}
export declare const Config: InjectionToken<Config>;
export declare const Fetch: InjectionToken<typeof fetch>;
export interface Get {
    path: string;
    handler: (req: any, res: any, next: any) => any;
}
export declare const Get: InjectionToken<Get[]>;
//# sourceMappingURL=token.d.ts.map
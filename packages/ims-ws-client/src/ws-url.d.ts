import { InjectionToken, StaticProvider } from "ims-core";
export interface WsUrl {
    (url: string, location?: Location): string;
}
export declare const WsUrl: InjectionToken<WsUrl>;
export declare const providers: StaticProvider[];
//# sourceMappingURL=ws-url.d.ts.map
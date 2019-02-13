import { InjectionToken, Injector } from "ims-core";
export interface ApiAddress {
    family: "ipv4" | "ipv6";
    host: string;
    transport: "tcp" | "http" | "socket" | "utp" | "udp";
    port?: number;
}
export declare abstract class ImsApi {
    injector: Injector;
    constructor(injector: Injector);
    abstract create(addr: ApiAddress, tokens: InjectionToken[]): Promise<void>;
}
export declare class ImsApiHttpClient extends ImsApi {
    create(addr: ApiAddress, tokens: InjectionToken[]): Promise<void>;
}
export declare class ImsApiHttpServer extends ImsApi {
    create(addr: ApiAddress, tokens: InjectionToken[]): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map
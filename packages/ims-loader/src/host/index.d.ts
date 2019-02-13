export declare class HostAddress {
    ip: string;
    port: number;
}
export declare class HostManaager {
    hostMap: Map<string, Host>;
    has(hash: string): boolean;
    get(hash: string): Host;
    set(host: Host): void;
}
export declare class Host {
    addr: HostAddress;
    readonly hash: string;
}
//# sourceMappingURL=index.d.ts.map
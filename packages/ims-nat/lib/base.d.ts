export interface Mapping {
    routerIp: string;
    internalIp: string;
    internalPort: number;
    externalIp: string;
    externalPort: number;
    ttl: number;
    protocol: "nat-pmp" | "pcp" | "upnp";
    nonce: any;
    errInfo: any;
}
export declare abstract class Nat {
    name: "nat-pmp" | "pcp" | "upnp";
    mappings: {
        [key: string]: Mapping;
    };
    log: any;
    constructor(name: "nat-pmp" | "pcp" | "upnp");
    newMapping(port: number): Mapping;
    addMapping(intPort: number, extPort: number, ttl?: number): Promise<Mapping>;
    deleteMapping(mapping: Mapping): Promise<void>;
    abstract _addPortMapping(intPort: number, extPort: number, ttl?: number): Promise<Mapping>;
    abstract _removePortMapping(intPort: number, extPort: number): Promise<any>;
}
//# sourceMappingURL=base.d.ts.map
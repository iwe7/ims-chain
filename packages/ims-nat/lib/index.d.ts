/// <reference types="node" />
export * from "./pmp";
export * from "./upnp";
import { Nat } from "./base";
import { EventEmitter } from "events";
export declare type Mappers = [Nat, Nat];
export declare const defMappers: Mappers;
export interface NatManagerOptions {
    autorenew: boolean;
    every: number;
}
export interface KeyMapping {
    [key: string]: Nat;
}
export declare class NatManager extends EventEmitter {
    mappers: Mappers;
    options: NatManagerOptions;
    activeMappings: KeyMapping;
    constructor(mappers?: Mappers, options?: NatManagerOptions);
    renewMappings(): Promise<void>;
    addMapping(intPort: number, extPort: number, ttl: number): Promise<void>;
    deleteMapping(extPort: number, extIp?: string): Promise<void>;
    getPublicIp(): Promise<string>;
    getGwIp(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
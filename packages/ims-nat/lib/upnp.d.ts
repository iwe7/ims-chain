import { Nat, Mapping } from "./base";
export declare class NatUpnp extends Nat {
    constructor();
    _addPortMapping(intPort: number, extPort: number, ttl?: number): Promise<Mapping>;
    _removePortMapping(intPort: number, extPort: number): Promise<any>;
}
//# sourceMappingURL=upnp.d.ts.map
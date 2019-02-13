import { Nat, Mapping } from "./base";
export declare class NatPMP extends Nat {
    constructor();
    _addPortMapping(intPort: number, extPort: number, ttl?: number): Promise<Mapping>;
    _removePortMapping(intPort: number, extPort: number): Promise<any>;
}
//# sourceMappingURL=pmp.d.ts.map
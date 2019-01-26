import { MetadataFactory, MetadataDef } from "./type";
import { InjectionToken } from "ims-core";
export interface IDecorator<T> extends Function {
    (o?: T): any;
    new (o?: T): any;
}
export declare function makeDecorator<T>(token: InjectionToken<MetadataFactory>, getDef?: (def: MetadataDef) => T, factory?: MetadataFactory): IDecorator<T>;
//# sourceMappingURL=makeDecorator.d.ts.map
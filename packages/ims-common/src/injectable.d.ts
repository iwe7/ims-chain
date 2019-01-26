import { MetadataFactory, ClassMetadata } from "ims-decorator";
import { InjectionToken, Injector } from "ims-core";
export declare const INJECTABLE: InjectionToken<any>;
export interface Injectable {
    provide?: InjectionToken;
    useFactory?: (injector: Injector) => Promise<any>;
    deps?: [];
    useCache?: boolean;
}
export declare class InjectableMetadataFactory extends MetadataFactory {
    type(def: ClassMetadata<Injectable>): any;
}
export declare const Injectable: import("../../ims-decorator/src/makeDecorator").IDecorator<Injectable>;
//# sourceMappingURL=injectable.d.ts.map
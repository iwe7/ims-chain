import { InjectionToken, Injector } from "ims-core";
export interface AppInitialization {
    (injector: Injector): Promise<void>;
}
export declare const AppInitialization: InjectionToken<any[] | AppInitialization[]>;
//# sourceMappingURL=tokens.d.ts.map
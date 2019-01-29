import { Compiler } from "webpack";
import { Injector, InjectionToken } from "ims-core";
export interface LibManifestPluginOptions {
    type?: string;
    entryOnly?: boolean;
    context?: string;
    format?: boolean;
    name: string;
    path: string;
}
export declare const LibManifestPluginOptions: InjectionToken<LibManifestPluginOptions>;
export declare class LibManifestPlugin {
    injector: Injector;
    options: LibManifestPluginOptions;
    constructor(injector: Injector);
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=dll.plugin.d.ts.map
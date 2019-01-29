import { Compiler, compilation } from "webpack";
import { Injector } from "ims-core";
export declare class ImsWebpackIpfsPlugin {
    injector: Injector;
    constructor(injector: Injector);
    uploadRes(compilation: compilation.Compilation, outputName: string): Promise<string>;
    handlerIndexHtml(): Promise<string>;
    addScript(compilation: compilation.Compilation, outputName: string): Promise<void>;
    addStyle(compilation: compilation.Compilation, outputName: string): Promise<void>;
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=ipfs.d.ts.map
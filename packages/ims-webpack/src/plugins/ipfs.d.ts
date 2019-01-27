import { Compiler, compilation } from "webpack";
import { Injector } from "ims-core";
export declare class ImsWebpackIpfsPlugin {
    injector: Injector;
    constructor(injector: Injector);
    handlerMainCss(compilation: compilation.Compilation): Promise<string | undefined>;
    handlerMainJs(compilation: compilation.Compilation): Promise<string | undefined>;
    handlerIndexHtml(compilation: compilation.Compilation, mainName?: string, mainCss?: string): Promise<string>;
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=ipfs.d.ts.map
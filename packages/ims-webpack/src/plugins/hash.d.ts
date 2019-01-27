import { Compiler } from "webpack";
import { Injector } from "ims-core";
export declare class ImsWebpackPluginHash {
    injector: Injector;
    constructor(injector: Injector);
    generateHash(content: string): string;
    compareModules(a: any, b: any): number;
    getModuleSource(module: any): any;
    concatenateSource(result: any, moduleSource: any): any;
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=hash.d.ts.map
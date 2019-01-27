"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsWebpackPluginHash {
    constructor(injector) {
        this.injector = injector;
    }
    generateHash(content) {
        console.log(content);
        debugger;
        return "demo";
    }
    compareModules(a, b) {
        let retVal = 0;
        if (a.resource < b.resource) {
            retVal = -1;
        }
        else if (a.resource > b.resource) {
            retVal = 1;
        }
        return retVal;
    }
    getModuleSource(module) {
        const source = module._source || {};
        return source._value || "";
    }
    concatenateSource(result, moduleSource) {
        return result + moduleSource;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap("ImsWebpackPluginHash", (compilation) => {
            compilation.hooks.chunkHash.tap("ImsWebpackPluginHash", async (chunk, chunkHash) => {
                console.log({ chunk, chunkHash });
            });
        });
    }
}
exports.ImsWebpackPluginHash = ImsWebpackPluginHash;
//# sourceMappingURL=hash.js.map
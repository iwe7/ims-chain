"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_core_1 = require("ims-core");
const ims_ipfs_1 = require("ims-ipfs");
const index_1 = require("./config/index");
exports.LibManifestPluginOptions = ims_core_1.InjectionToken.fromString("LibManifestPluginOptions");
class LibManifestPlugin {
    constructor(injector) {
        this.injector = injector;
        this.options = {
            name: "dll",
            path: "dll"
        };
    }
    async uploadRes(compilation, outputName) {
        let ipfs = await this.injector.get(ims_ipfs_1.IpfsApi);
        const assets = compilation.assets;
        const chunk = assets[outputName];
        if (chunk) {
            delete assets[outputName];
            let results = await ipfs.add([
                {
                    path: outputName,
                    content: chunk.source()
                }
            ]);
            let res = results[0];
            return res.hash;
        }
        return void 0;
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync("LibManifestPlugin", async (compilation, callback) => {
            let res = await this.uploadRes(compilation, "react.js");
            let dll = index_1.default.get("dll") || [];
            dll.push(res);
            index_1.default.set("dll", dll);
        });
    }
}
exports.LibManifestPlugin = LibManifestPlugin;

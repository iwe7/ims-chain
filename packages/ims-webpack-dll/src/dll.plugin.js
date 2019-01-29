"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncLib = require("neo-async");
const SingleEntryDependency = require("webpack/lib/SingleEntryPlugin");
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
    apply(compiler) {
        compiler.hooks.emit.tapAsync("LibManifestPlugin", async (compilation, callback) => {
            this.options =
                (await this.injector.get(exports.LibManifestPluginOptions)) || this.options;
            let ipfs = await this.injector.get(ims_ipfs_1.IpfsApi);
            asyncLib.forEach(compilation.chunks, async (chunk, callback) => {
                if (!chunk.isOnlyInitial()) {
                    callback();
                    return;
                }
                const targetPath = compilation.getPath(this.options.path, {
                    hash: compilation.hash,
                    chunk
                });
                const name = this.options.name &&
                    compilation.getPath(this.options.name, {
                        hash: compilation.hash,
                        chunk
                    });
                const manifest = {
                    name,
                    type: this.options.type,
                    content: Array.from(chunk.modulesIterable, (module) => {
                        if (this.options.entryOnly &&
                            !module.reasons.some(r => r.dependency instanceof SingleEntryDependency)) {
                            return;
                        }
                        if (module.libIdent) {
                            const ident = module.libIdent({
                                context: this.options.context || compiler.options.context
                            });
                            if (ident) {
                                return {
                                    ident,
                                    data: {
                                        id: module.id,
                                        buildMeta: module.buildMeta
                                    }
                                };
                            }
                        }
                    })
                        .filter(Boolean)
                        .reduce((obj, item) => {
                        obj[item.ident] = item.data;
                        return obj;
                    }, Object.create(null))
                };
                const manifestContent = this.options.format
                    ? JSON.stringify(manifest, null, 2)
                    : JSON.stringify(manifest);
                let result = await ipfs.add([
                    {
                        path: targetPath,
                        content: manifestContent
                    }
                ]);
                let dll = index_1.default.get("dll") || [];
                dll.push(result[0].hash);
                index_1.default.set("dll", dll);
                callback();
            }, callback);
        });
    }
}
exports.LibManifestPlugin = LibManifestPlugin;

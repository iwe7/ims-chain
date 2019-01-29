import asyncLib = require("neo-async");
import SingleEntryDependency = require("webpack/lib/SingleEntryPlugin");
import { Compiler, compilation } from "webpack";
import { Injector, InjectionToken } from "ims-core";
import { IpfsApi } from "ims-ipfs";
import config from "./config/index";

export interface LibManifestPluginOptions {
  type?: string;
  entryOnly?: boolean;
  context?: string;
  format?: boolean;
  name: string;
  path: string;
}

export const LibManifestPluginOptions = InjectionToken.fromString<
  LibManifestPluginOptions
>("LibManifestPluginOptions");

export class LibManifestPlugin {
  options: LibManifestPluginOptions = {
    name: "dll",
    path: "dll"
  };
  constructor(public injector: Injector) {}
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(
      "LibManifestPlugin",
      async (compilation: compilation.Compilation, callback: Function) => {
        this.options =
          (await this.injector.get(LibManifestPluginOptions)) || this.options;
        let ipfs = await this.injector.get(IpfsApi);
        asyncLib.forEach(
          compilation.chunks,
          async (chunk: any, callback: any) => {
            if (!chunk.isOnlyInitial()) {
              callback();
              return;
            }
            const targetPath = compilation.getPath(this.options.path!, {
              hash: compilation.hash,
              chunk
            });
            const name =
              this.options.name &&
              compilation.getPath(this.options.name, {
                hash: compilation.hash,
                chunk
              });
            const manifest = {
              name,
              type: this.options.type,
              content: Array.from(chunk.modulesIterable, (module: any) => {
                if (
                  this.options.entryOnly &&
                  !module.reasons.some(
                    r => r.dependency instanceof SingleEntryDependency
                  )
                ) {
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
                .reduce((obj, item: any) => {
                  obj[item.ident] = item.data;
                  return obj;
                }, Object.create(null))
            };
            // Apply formatting to content if format flag is true;
            const manifestContent = this.options.format
              ? JSON.stringify(manifest, null, 2)
              : JSON.stringify(manifest);
            let result = await ipfs.add([
              {
                path: targetPath,
                content: manifestContent
              }
            ]);
            let dll = config.get<string[]>("dll") || [];
            dll.push(result[0].hash);
            config.set("dll", dll);
            callback();
          },
          callback
        );
      }
    );
  }
}

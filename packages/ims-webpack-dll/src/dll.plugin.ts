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

  async uploadRes(compilation: compilation.Compilation, outputName: string) {
    let ipfs = await this.injector.get(IpfsApi);
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
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(
      "LibManifestPlugin",
      async (compilation: compilation.Compilation, callback: Function) => {
        let res = await this.uploadRes(compilation, "react.js");
        let dll = config.get<string[]>("dll") || [];
        dll.push(res);
        config.set("dll", dll);
      }
    );
  }
}

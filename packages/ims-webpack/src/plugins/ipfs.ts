import { Compiler, compilation } from "webpack";
import { Injector } from "ims-core";
import { IpfsApi } from "ims-ipfs";
import { Config } from "ims-cloud";
import * as html from "./html";
import { imsConfig } from "ims-webpack-dll";

export class ImsWebpackIpfsPlugin {
  constructor(public injector: Injector) {}
  async uploadRes(compilation: compilation.Compilation, outputName: string) {
    let ipfs = await this.injector.get<IpfsApi>(IpfsApi);
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
  async handlerIndexHtml() {
    let ipfs = await this.injector.get<IpfsApi>(IpfsApi);
    let outputName = "index.html";
    let results = await ipfs.add([
      {
        path: outputName,
        content: html.htmlToString()
      }
    ]);
    let res = results[0];
    return res.hash;
  }
  async addScript(compilation: compilation.Compilation, outputName: string) {
    let hash = await this.uploadRes(compilation, outputName);
    hash && html.addScript(`/${hash}`);
  }
  async addStyle(compilation: compilation.Compilation, outputName: string) {
    let hash = await this.uploadRes(compilation, outputName);
    hash && html.addStyle(`/${hash}`);
  }
  apply(compiler: Compiler): void {
    // 打包阶段
    html.initOpt();
    compiler.hooks.emit.tap(
      "ImsWebpackPlugin",
      (compilation: compilation.Compilation) => {
        let hooks = compilation.hooks as any;
        hooks.htmlWebpackPluginAfterEmit.tapAsync(
          "ImsWebpackPlugin",
          async (item: any, callback: any) => {
            // index.html
            imsConfig.get("dll").map(str => html.addScript(str));
            await this.addStyle(compilation, "main.css");
            await this.addScript(compilation, "main.js");
            let htmlName = await this.handlerIndexHtml();
            let config = await this.injector.get<Config>(Config);
            if (!config) config = { port: 4802, host: "192.168.1.101" };
            console.log(`http://${config.host}:${config.port}/${htmlName}`);
            callback();
          }
        );
      }
    );
  }
}

import { Compiler, compilation } from "webpack";
import { Injector } from "ims-core";
import { IpfsApi } from "ims-ipfs";
import { Config } from "ims-cloud";

export class ImsWebpackIpfsPlugin {
  constructor(public injector: Injector) {}
  async handlerMainCss(
    compilation: compilation.Compilation
  ): Promise<string | undefined> {
    let ipfs = await this.injector.get(IpfsApi);
    const assets = compilation.assets;
    let outputName = "main.css";
    const chunk = assets[outputName];
    if (chunk && chunk.source()) {
      delete assets[outputName];
      let results = await ipfs.add([
        {
          path: outputName,
          content: chunk.source()
        }
      ]);
      let res = results[0];
      let filename = res.hash;
      return filename;
    }
    return void 0;
  }
  async handlerMainJs(compilation: compilation.Compilation) {
    let ipfs = await this.injector.get(IpfsApi);
    const assets = compilation.assets;
    let outputName = "main.js";
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
      let filename = res.hash;
      return filename;
    }
    return void 0;
  }
  async handlerIndexHtml(
    compilation: compilation.Compilation,
    mainName?: string,
    mainCss?: string
  ) {
    let ipfs = await this.injector.get(IpfsApi);
    const assets = compilation.assets;
    let outputName = "index.html";
    const chunk = assets[outputName];
    delete assets[outputName];
    let content: string = chunk.source();
    if (mainName) {
      content = content.replace("main.js", mainName);
    }
    if (mainCss) {
      content = content.replace("main.css", mainCss);
    }
    let results = await ipfs.add([
      {
        path: outputName,
        content: content
      }
    ]);
    let res = results[0];
    let filename = `static/${res.hash}`;
    return filename;
  }
  apply(compiler: Compiler): void {
    // 打包阶段
    compiler.hooks.emit.tap(
      "ImsWebpackPlugin",
      (compilation: compilation.Compilation) => {
        let hooks = compilation.hooks as any;
        hooks.htmlWebpackPluginAfterEmit.tapAsync(
          "ImsWebpackPlugin",
          async (item: any, callback: any) => {
            // index.html
            let mainName = await this.handlerMainJs(compilation);
            let mainCss = await this.handlerMainCss(compilation);
            let htmlName = await this.handlerIndexHtml(
              compilation,
              mainName,
              mainCss
            );
            let config = await this.injector.get<Config>(Config);
            if (!config) config = { port: 4802, host: "localhost" };
            console.log(`http://${config.host}:${config.port}/${htmlName}`);
            callback();
          }
        );
      }
    );
  }
}

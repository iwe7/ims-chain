"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_ipfs_1 = require("ims-ipfs");
const ims_cloud_1 = require("ims-cloud");
class ImsWebpackIpfsPlugin {
    constructor(injector) {
        this.injector = injector;
    }
    async handlerMainCss(compilation) {
        let ipfs = await this.injector.get(ims_ipfs_1.IpfsApi);
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
    async handlerMainJs(compilation) {
        let ipfs = await this.injector.get(ims_ipfs_1.IpfsApi);
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
    async handlerIndexHtml(compilation, mainName, mainCss) {
        let ipfs = await this.injector.get(ims_ipfs_1.IpfsApi);
        const assets = compilation.assets;
        let outputName = "index.html";
        const chunk = assets[outputName];
        delete assets[outputName];
        let content = chunk.source();
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
    apply(compiler) {
        compiler.hooks.emit.tap("ImsWebpackPlugin", (compilation) => {
            let hooks = compilation.hooks;
            hooks.htmlWebpackPluginAfterEmit.tapAsync("ImsWebpackPlugin", async (item, callback) => {
                let mainName = await this.handlerMainJs(compilation);
                let mainCss = await this.handlerMainCss(compilation);
                let htmlName = await this.handlerIndexHtml(compilation, mainName, mainCss);
                let config = await this.injector.get(ims_cloud_1.Config);
                if (!config)
                    config = { port: 4802, host: "localhost" };
                console.log(`http://${config.host}:${config.port}/${htmlName}`);
                callback();
            });
        });
    }
}
exports.ImsWebpackIpfsPlugin = ImsWebpackIpfsPlugin;
//# sourceMappingURL=ipfs.js.map
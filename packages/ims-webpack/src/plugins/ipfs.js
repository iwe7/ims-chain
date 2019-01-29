"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_ipfs_1 = require("ims-ipfs");
const ims_cloud_1 = require("ims-cloud");
const html = require("./html");
class ImsWebpackIpfsPlugin {
    constructor(injector) {
        this.injector = injector;
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
    async handlerIndexHtml() {
        let ipfs = await this.injector.get(ims_ipfs_1.IpfsApi);
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
    async addScript(compilation, outputName) {
        let hash = await this.uploadRes(compilation, outputName);
        hash && html.addScript(`/${hash}`);
    }
    async addStyle(compilation, outputName) {
        let hash = await this.uploadRes(compilation, outputName);
        hash && html.addStyle(`/${hash}`);
    }
    apply(compiler) {
        compiler.hooks.emit.tap("ImsWebpackPlugin", (compilation) => {
            let hooks = compilation.hooks;
            hooks.htmlWebpackPluginAfterEmit.tapAsync("ImsWebpackPlugin", async (item, callback) => {
                await this.addStyle(compilation, "main.css");
                await this.addScript(compilation, "shim.js");
                await this.addScript(compilation, "vendors~main~react.js");
                await this.addScript(compilation, "vendors~main.js");
                await this.addScript(compilation, "main.js");
                await this.addScript(compilation, "react.js");
                let htmlName = await this.handlerIndexHtml();
                let config = await this.injector.get(ims_cloud_1.Config);
                if (!config)
                    config = { port: 4802, host: "192.168.1.101" };
                console.log(`http://${config.host}:${config.port}/${htmlName}`);
                callback();
            });
        });
    }
}
exports.ImsWebpackIpfsPlugin = ImsWebpackIpfsPlugin;

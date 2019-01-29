"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const webpack_1 = require("webpack");
const path = require("path");
const webpack = require("webpack");
const dll_plugin_1 = require("./dll.plugin");
const ims_ipfs_server_1 = require("ims-ipfs-server");
const index_1 = require("./config/index");
let ImsWebpackDllModule = class ImsWebpackDllModule {
};
ImsWebpackDllModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_common_1.AppInitialization,
                useFactory: (injector) => {
                    index_1.default.set("dll", []);
                    let imsWebpackDllPlugin = new dll_plugin_1.LibManifestPlugin(injector);
                    const cfg = {
                        entry: {
                            react: ["react", "react-dom", "react-router-dom", "ipfs"]
                        },
                        output: {
                            filename: `[name].js`
                        },
                        plugins: [
                            new webpack_1.DllPlugin({
                                name: "__dll__[name]",
                                path: path.join(__dirname, "dll", "manifest.json")
                            }),
                            imsWebpackDllPlugin
                        ]
                    };
                    webpack(cfg).run((err, stats) => {
                        console.log(stats);
                    });
                }
            }
        ],
        imports: [ims_ipfs_server_1.ImsIpfsServerModule]
    })
], ImsWebpackDllModule);
exports.ImsWebpackDllModule = ImsWebpackDllModule;
var config_1 = require("./config");
exports.config = config_1.config;
var index_2 = require("./config/index");
exports.imsConfig = index_2.default;

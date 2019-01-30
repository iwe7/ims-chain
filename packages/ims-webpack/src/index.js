"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const webpack = require("webpack");
const path = require("path");
const index_1 = require("./plugins/index");
const ims_ipfs_server_1 = require("ims-ipfs-server");
const tokens_1 = require("./tokens");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ims_webpack_dll_1 = require("ims-webpack-dll");
let ImsWebpackModule = class ImsWebpackModule {
};
ImsWebpackModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_core_1.InjectionToken.fromType(index_1.ImsWebpackIpfsPlugin),
                useFactory: async (injector) => {
                    return new index_1.ImsWebpackIpfsPlugin(injector);
                }
            },
            {
                provide: tokens_1.WebpackName,
                useFactory: () => "demo"
            },
            {
                provide: tokens_1.WebpackMain,
                useFactory: () => [path.join(__dirname, "test", "index.tsx")]
            },
            {
                provide: tokens_1.WebpackDev,
                useFactory: () => true
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    let imsWebpackIpfsPlugin = await injector.get(ims_core_1.InjectionToken.fromType(index_1.ImsWebpackIpfsPlugin));
                    let name = await injector.get(tokens_1.WebpackName);
                    let main = await injector.get(tokens_1.WebpackMain);
                    let dev = await injector.get(tokens_1.WebpackDev);
                    let cfg = {
                        mode: dev ? "development" : "production",
                        name,
                        watch: dev ? true : false,
                        target: "web",
                        entry: {
                            main
                        },
                        output: {
                            path: path.join(__dirname, "dist"),
                            filename: `[name].js`
                        },
                        resolve: {
                            extensions: [".tsx", ".ts", ".jsx", ".js"],
                            modules: ["node_modules", "packages"]
                        },
                        module: {
                            rules: [
                                { test: /\.tsx?$/, loader: "ts-loader" },
                                {
                                    test: /\.scss$/,
                                    use: [
                                        dev ? "style-loader" : MiniCssExtractPlugin.loader,
                                        "css-loader",
                                        "sass-loader"
                                    ]
                                }
                            ]
                        },
                        optimization: {
                            minimize: true,
                            providedExports: true,
                            usedExports: true,
                            sideEffects: true,
                            concatenateModules: true,
                            noEmitOnErrors: true,
                            splitChunks: {
                                chunks: "all",
                                minSize: 30000,
                                minChunks: 1,
                                maxAsyncRequests: 5,
                                maxInitialRequests: 3,
                                name: true,
                                cacheGroups: {
                                    default: {
                                        minChunks: 2,
                                        priority: -20,
                                        reuseExistingChunk: true
                                    },
                                    vendors: {
                                        test: /[\\/]node_modules[\\/]/,
                                        priority: -10
                                    }
                                }
                            }
                        },
                        plugins: [
                            imsWebpackIpfsPlugin,
                            new MiniCssExtractPlugin({
                                filename: "[name].css",
                                chunkFilename: "[id].css"
                            }),
                            new HtmlPlugin({
                                title: "my app",
                                filename: "index.html",
                                template: path.join(__dirname, "test/index.html")
                            }),
                            new webpack.DllReferencePlugin(ims_webpack_dll_1.config)
                        ]
                    };
                    if (dev) {
                        webpack(cfg).watch({}, (err, stats) => {
                            let messages = ``;
                            if (stats.hasErrors()) {
                                stats
                                    .toJson()
                                    .errors.map((error) => (messages += `${error}\n`));
                                console.error("webpack:error", messages);
                                return;
                            }
                            if (stats.hasWarnings()) {
                                stats.toJson().warnings.map((warn) => console.warn(warn));
                                return;
                            }
                        });
                    }
                    else {
                        webpack(cfg).run((err, stats) => {
                            if (stats.hasErrors()) {
                                console.error("webpack:error", stats.toJson().errors);
                            }
                            console.log("webpack:success", stats.toJson());
                        });
                    }
                }
            }
        ],
        imports: [ims_ipfs_server_1.ImsIpfsServerModule]
    })
], ImsWebpackModule);
exports.ImsWebpackModule = ImsWebpackModule;
tslib_1.__exportStar(require("./tokens"), exports);
var index_2 = require("./plugins/index");
exports.html = index_2.html;

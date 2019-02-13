"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlPlugin = require("html-webpack-plugin");
let ImsAdminBuildModule = class ImsAdminBuildModule {
};
ImsAdminBuildModule = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [],
        providers: [
            {
                provide: ims_common_1.AppInitialization,
                useFactory: () => {
                    const config = {
                        mode: "development",
                        entry: {
                            main: path.join(__dirname, "index.tsx")
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
                                    use: ["style-loader", "css-loader", "sass-loader"]
                                }
                            ]
                        },
                        plugins: [
                            new HtmlPlugin({
                                title: "my app",
                                filename: "index.html",
                                template: path.join(__dirname, "index.html")
                            })
                        ]
                    };
                    const compiler = webpack(config);
                    let dev = new WebpackDevServer(compiler, {});
                    dev.listen(80);
                }
            }
        ]
    })
], ImsAdminBuildModule);
exports.ImsAdminBuildModule = ImsAdminBuildModule;
ims_common_1.bootstrapModule(ImsAdminBuildModule);

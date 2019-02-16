"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
const ims_web_impl_1 = require("ims-web-impl");
exports.AppConfig = ims_core_1.InjectionToken.fromString('AppConfig');
let ImsAdminBuildModule = class ImsAdminBuildModule {
};
ImsAdminBuildModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: ims_core_1.InjectionToken.fromType(ims_web_1.ImsIpfs),
                useFactory: async () => {
                    return new ims_web_impl_1.ImsIpfsImpl();
                }
            },
            {
                provide: exports.AppConfig,
                useFactory: () => {
                    return {
                        name: 'demo'
                    };
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    const appConfig = await injector.get(exports.AppConfig);
                    const ipfs = await injector.get(ims_web_1.ImsIpfs);
                    console.log('app init');
                    if (appConfig.name) {
                        if (!appConfig.key) {
                            const key = await ipfs.key.get(appConfig.name);
                            appConfig.key = key.id;
                        }
                        const outputPath = path.join(process.cwd(), 'dist', appConfig.name);
                        const config = {
                            mode: "development",
                            target: "web",
                            devtool: "source-map",
                            entry: {
                                main: path.join(__dirname, "index.tsx")
                            },
                            output: {
                                path: outputPath,
                                filename: `[name].[hash].js`,
                                publicPath: 'https://viveka.cn/?h=' + appConfig.key + '&p='
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
                                    },
                                    {
                                        test: /\.css/,
                                        use: ["style-loader", "css-loader"]
                                    }
                                ]
                            },
                            watch: true,
                            plugins: [
                                new HtmlPlugin({
                                    filename: "index.html",
                                    template: path.join(__dirname, "index.html")
                                })
                            ]
                        };
                        const compiler = webpack(config);
                        compiler.watch({}, async (err, stats) => {
                            if (err)
                                throw err;
                            if (stats.hasErrors()) {
                                const errors = stats.toJson().errors;
                                errors.map(err => console.log(err));
                            }
                            const files = fs.readdirSync(outputPath).map(file => {
                                const content = fs.readFileSync(path.join(outputPath, file)).toString();
                                return {
                                    path: `${appConfig.name}/${file}`,
                                    content,
                                };
                            });
                            const addRes = await ipfs.add(files);
                            const hash = addRes[addRes.length - 1].hash;
                            ipfs.name.publish(`/ipfs/${hash}`, {
                                key: appConfig.key
                            });
                            console.log('upload');
                        });
                    }
                }
            }
        ]
    })
], ImsAdminBuildModule);
exports.ImsAdminBuildModule = ImsAdminBuildModule;
ims_common_1.bootstrapModule(ImsAdminBuildModule);

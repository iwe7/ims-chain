import { Module, bootstrapModule, AppInitialization } from "ims-common";
import path = require("path");
import fs = require("fs");

import { Configuration, Stats } from "webpack";
import webpack = require("webpack");
import HtmlPlugin = require("html-webpack-plugin");
import { Injector, InjectionToken } from "ims-core";
import { ImsIpfs } from "ims-web";
import { ImsIpfsImpl } from 'ims-web-impl';

export interface AppConfig {
    key?: string;
    name: string;
}

export const AppConfig = InjectionToken.fromString('AppConfig')
@Module({
    providers: [
        {
            provide: InjectionToken.fromType(ImsIpfs),
            useFactory: async () => {
                return new ImsIpfsImpl()
            }
        },
        {
            provide: AppConfig,
            useFactory: () => {
                return {
                    name: 'demo'
                }
            }
        },
        {
            provide: AppInitialization,
            useFactory: async (injector: Injector) => {
                const appConfig = await injector.get<AppConfig>(AppConfig);
                const ipfs = await injector.get<ImsIpfs>(ImsIpfs);
                console.log('app init');
                if (appConfig.name) {
                    if (!appConfig.key) {
                        const key = await ipfs.key.get(appConfig.name);
                        appConfig.key = key.id;
                    }
                    const outputPath = path.join(process.cwd(), 'dist', appConfig.name);
                    const config: Configuration = {
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
                    compiler.watch({}, async (err: Error, stats: Stats) => {
                        if (err) throw err;
                        if (stats.hasErrors()) {
                            const errors = stats.toJson().errors;
                            errors.map(err => console.log(err))
                        }
                        // if (stats.hasWarnings()) console.warn(stats.toJson().warnings)
                        // 发布到网上
                        const files = fs.readdirSync(outputPath).map(file => {
                            const content = fs.readFileSync(path.join(outputPath, file)).toString()
                            return {
                                path: `${appConfig.name}/${file}`,
                                content,
                            }
                        })
                        const addRes = await ipfs.add(files)
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
export class ImsAdminBuildModule { }
bootstrapModule(ImsAdminBuildModule);

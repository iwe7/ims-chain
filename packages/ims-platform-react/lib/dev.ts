import { Module, bootstrapModule, AppInitialization } from "ims-common";
import path = require("path");

import { Configuration } from "webpack";
import webpack = require("webpack");
import HtmlPlugin = require("html-webpack-plugin");
import { Injector, InjectionToken } from "ims-core";
import { ImsIpfs } from "ims-web";
import { ImsIpfsImpl } from 'ims-web-impl';
import express = require('express');
const app = express();
import proxy = require('http-proxy-middleware')
import devMiddleware = require('webpack-dev-middleware')

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
                            filename: `[name].[hash].js`
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
                    const devServer = devMiddleware(compiler);
                    app.use(devServer);
                    app.use("/api", proxy({
                        target: 'https://viveka.cn',
                        changeOrigin: true
                    }))
                    app.listen(8082, () => {
                        console.log('8082')
                    });
                }
            }
        }
    ]
})
export class ImsAdminBuildModule { }
bootstrapModule(ImsAdminBuildModule);

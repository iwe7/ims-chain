"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const middleware = require("webpack-dev-middleware");
const express = require("express");
const http = require("http");
const app = express();
const ims_cloud_server_1 = require("ims-cloud-server");
const ims_cloud_1 = require("ims-cloud");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
const bodyParser = require("body-parser");
const ims_web_impl_1 = require("ims-web-impl");
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const ims_close_port_1 = require("ims-close-port");
let ImsAdminBuildModule = class ImsAdminBuildModule {
};
ImsAdminBuildModule = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [ims_cloud_server_1.ImsCloudServerModule],
        providers: [
            {
                provide: ims_cloud_1.Routes,
                useFactory: () => {
                    return [
                        ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser),
                        ims_core_1.InjectionToken.fromType(ims_web_1.ImsIpfs)
                    ];
                }
            },
            {
                provide: ims_core_1.InjectionToken.fromType(ims_web_1.ImsIpfs),
                useFactory: async (injector) => {
                    return await injector.get(ims_web_impl_1.ImsIpfsImpl);
                }
            },
            {
                provide: ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser),
                useFactory: async (injector) => {
                    return await injector.get(ims_web_impl_1.ImsUserImpl);
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    const config = {
                        mode: "development",
                        target: "web",
                        entry: {
                            main: path.join(__dirname, "lib/index.tsx")
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
                                title: "my app",
                                filename: "index.html",
                                template: path.join(__dirname, "lib/index.html")
                            })
                        ]
                    };
                    const compiler = webpack(config);
                    const router = await injector.get(ims_cloud_1.Router);
                    router && app.use("/api", router);
                    app.use(middleware(compiler));
                    const httpServer = http.createServer(app);
                    await ims_close_port_1.close(4203);
                    httpServer.listen(4203, "127.0.0.1", () => {
                        console.log("start 4203");
                    });
                }
            }
        ]
    })
], ImsAdminBuildModule);
exports.ImsAdminBuildModule = ImsAdminBuildModule;
ims_common_1.bootstrapModule(ImsAdminBuildModule);

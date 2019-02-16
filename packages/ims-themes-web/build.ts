import { Module, bootstrapModule, AppInitialization } from "ims-common";
import path = require("path");
import { Configuration } from "webpack";
import webpack = require("webpack");
import HtmlPlugin = require("html-webpack-plugin");
import middleware = require("webpack-dev-middleware");
import express = require("express");
import http = require("http");
const app = express();
import { ImsCloudServerModule } from "ims-cloud-server";
import { Router, Routes } from "ims-cloud";
import { Injector, InjectionToken } from "ims-core";
import { ImsUser, ImsIpfs } from "ims-web";
import bodyParser = require("body-parser");
import { ImsUserImpl, ImsIpfsImpl } from "ims-web-impl";
import cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
import { close } from "ims-close-port";
@Module({
  imports: [ImsCloudServerModule],
  providers: [
    {
      provide: Routes,
      useFactory: () => {
        return [
          InjectionToken.fromType(ImsUser),
          InjectionToken.fromType(ImsIpfs)
        ];
      }
    },
    {
      provide: InjectionToken.fromType(ImsIpfs),
      useFactory: async (injector: Injector) => {
        return await injector.get(ImsIpfsImpl);
      }
    },
    {
      provide: InjectionToken.fromType(ImsUser),
      useFactory: async (injector: Injector) => {
        return await injector.get(ImsUserImpl);
      }
    },
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        const config: Configuration = {
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
        const router = await injector.get(Router);
        router && app.use("/api", router as any);

        app.use(middleware(compiler));
        const httpServer = http.createServer(app);
        await close(4203);
        httpServer.listen(4203, "127.0.0.1", () => {
          console.log("start 4203");
          // 启动成功通知其他节点
        });
      }
    }
  ]
})
export class ImsAdminBuildModule { }
bootstrapModule(ImsAdminBuildModule);

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
import { ImsUser } from "ims-web";
import bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

@Module({
  imports: [ImsCloudServerModule],
  providers: [
    {
      provide: Routes,
      useFactory: () => {
        return [InjectionToken.fromType(ImsUser)];
      }
    },
    {
      provide: InjectionToken.fromType(ImsUser),
      useFactory: async () => {
        return {
          login() {
            return "login";
          }
        };
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
        app.use(
          middleware(compiler, {
            // webpack-dev-middleware options
            disableHostCheck: true,
            watch: true
          })
        );
        const router = await injector.get(Router);
        app.use("/api", router);
        const httpServer = http.createServer(app);
        httpServer.listen(4203, "127.0.0.1", () => {
          console.log("start 4203");
        });
      }
    }
  ]
})
export class ImsAdminBuildModule {}

bootstrapModule(ImsAdminBuildModule);

import { Module, AppInitialization } from "ims-common";
import { Injector, InjectionToken } from "ims-core";
import webpack = require("webpack");
import path = require("path");
import { ImsWebpackIpfsPlugin } from "./plugins/index";
import { ImsIpfsServerModule } from "ims-ipfs-server";
import { WebpackName, WebpackDev } from "./tokens";
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
@Module({
  providers: [
    {
      provide: InjectionToken.fromType(ImsWebpackIpfsPlugin),
      useFactory: async (injector: Injector) => {
        return new ImsWebpackIpfsPlugin(injector);
      }
    },
    {
      provide: WebpackName,
      useFactory: () => "demo"
    },
    {
      provide: WebpackDev,
      useFactory: () => true
    },
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        let imsWebpackIpfsPlugin = await injector.get(
          InjectionToken.fromType(ImsWebpackIpfsPlugin)
        );
        let name = await injector.get(WebpackName);
        let dev = await injector.get(WebpackDev);
        let cfg: webpack.Configuration = {
          mode: dev ? "development" : "production",
          name,
          watch: dev ? true : false,
          entry: {
            main: [path.join(__dirname, "test", "index.ts")]
          },
          output: {
            path: path.join(__dirname, "dist"),
            filename: `[name].js`
          },
          resolve: {
            extensions: [".ts", ".tsx", ".js"]
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
            })
          ]
        };
        if (dev) {
          webpack(cfg).watch({}, (err: Error, stats: webpack.Stats) => {
            let messages = ``;
            if (stats.hasErrors()) {
              stats
                .toJson()
                .errors.map((error: string) => (messages += `${error}\n`));
              console.error("webpack:error", messages);
              return;
            }
            console.log("webpack:success", stats.toJson());
          });
        } else {
          webpack(cfg).run((err: Error, stats: webpack.Stats) => {
            if (stats.hasErrors()) {
              console.error("webpack:error", stats.toJson().errors);
            }
            console.log("webpack:success", stats.toJson());
          });
        }
      }
    }
  ],
  imports: [ImsIpfsServerModule]
})
export class ImsWebpackModule {}

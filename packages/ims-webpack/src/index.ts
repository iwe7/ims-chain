import { Module, AppInitialization } from "ims-common";
import { Injector, InjectionToken } from "ims-core";
import webpack = require("webpack");
import path = require("path");
import { ImsWebpackIpfsPlugin } from "./plugins/index";
import { ImsIpfsServerModule } from "ims-ipfs-server";
import { WebpackName, WebpackDev, WebpackMain } from "./tokens";
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import { config } from "ims-webpack-dll";

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
      provide: WebpackMain,
      useFactory: () => [path.join(__dirname, "test", "index.tsx")]
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
        let main = await injector.get(WebpackMain);
        let dev = await injector.get(WebpackDev);
        let cfg: webpack.Configuration = {
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
            new webpack.DllReferencePlugin(config)
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
            if (stats.hasWarnings()) {
              stats.toJson().warnings.map((warn: any) => console.warn(warn));
              return;
            }
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
export * from "./tokens";
export { html } from "./plugins/index";

import { Module, bootstrapModule, AppInitialization } from "ims-common";
import path = require("path");
import { Configuration } from "webpack";
import webpack = require("webpack");
import WebpackDevServer = require("webpack-dev-server");
import HtmlPlugin = require("html-webpack-plugin");

@Module({
  imports: [],
  providers: [
    {
      provide: AppInitialization,
      useFactory: () => {
        const config: Configuration = {
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
export class ImsAdminBuildModule {}

bootstrapModule(ImsAdminBuildModule);

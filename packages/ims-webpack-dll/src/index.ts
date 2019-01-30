import { Module, AppInitialization } from "ims-common";
import { Configuration, DllPlugin } from "webpack";
import path = require("path");
import webpack = require("webpack");
import { LibManifestPlugin } from "./dll.plugin";
import { Injector } from "ims-core";
import { ImsIpfsServerModule } from "ims-ipfs-server";
import config from "./config/index";

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: (injector: Injector) => {
        config.set("dll", []);
        let imsWebpackDllPlugin = new LibManifestPlugin(injector);
        const cfg: Configuration = {
          entry: {
            react: ["react", "react-dom", "react-router-dom", "redux", "ipfs"]
          },
          output: {
            filename: `[name].js`
          },
          plugins: [
            new DllPlugin({
              name: "__dll__[name]",
              path: path.join(__dirname, "dll", "manifest.json")
            }),
            imsWebpackDllPlugin
          ]
        };
        webpack(cfg).run((err, stats) => {
          console.log(stats);
        });
      }
    }
  ],
  imports: [ImsIpfsServerModule]
})
export class ImsWebpackDllModule {}

export { config } from "./config";
export { default as imsConfig } from "./config/index";

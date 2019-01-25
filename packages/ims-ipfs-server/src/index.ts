import { ImsCloudServerModule } from "ims-cloud-server";
import { Module } from "ims-common";
import { Ipfs, IpfsConfig, IpfsApi } from "ims-ipfs";
import { Injector, InjectionToken } from "ims-core";
import { Routes, After } from "ims-cloud";
import { ImsFsServer } from "./fs";
const IPFS = require("ipfs");

@Module({
  providers: [
    {
      provide: IpfsApi,
      useFactory: (injector: Injector) => new ImsFsServer(injector),
      deps: []
    },
    {
      provide: After,
      useFactory: async (injector: Injector) => {
        let api = await injector.get(
          InjectionToken.fromType<ImsFsServer>(ImsFsServer)
        );
        return {
          path: "/fs/:hash",
          handler: async (req: any, res: any, next: any) => {
            let params = req.params;
            if (params.hash) {
              return await api.cat(params.hash);
            }
          }
        };
      },
      deps: [],
      multi: true
    },
    {
      provide: Ipfs,
      useFactory: async (injector: Injector) => {
        let config = await injector.get(IpfsConfig);
        return new Promise(resolve => {
          let node = new IPFS(config);
          node.on("ready", () => {
            resolve(node);
          });
        });
      },
      cache: true,
      deps: []
    },
    {
      provide: IpfsConfig,
      useFactory: () => {
        return {
          repo: ".ipfs"
        } as IpfsConfig;
      }
    },
    {
      provide: Routes,
      useFactory: () => IpfsApi,
      deps: [],
      multi: true
    }
  ],
  imports: [ImsCloudServerModule]
})
export class ImsFsServerModule {}

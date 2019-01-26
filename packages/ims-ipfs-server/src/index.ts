import { ImsCloudServerModule } from "ims-cloud-server";
import { Module, AppInitialization } from "ims-common";
import { Ipfs, IpfsConfig, IpfsApi } from "ims-ipfs";
import { Injector, InjectionToken } from "ims-core";
import { Routes, After } from "ims-cloud";
import { ImsFsServer } from "./fs";
const IPFS = require("ipfs");

@Module({
  providers: [
    {
      provide: IpfsApi,
      useFactory: (injector: Injector) => new ImsFsServer(injector)
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
      }
    },
    {
      provide: IpfsConfig,
      useFactory: () => {
        return {
          repo: ".ipfs",
          preload: {
            enabled: true,
            addresses: [
              "/ip4/121.42.158.224/tcp/4001/ipfs/QmUxa7SUbHu4p2TtwDYLcHjQn2HqdMYpQn1paKpsP7tKao"
            ]
          }
        } as IpfsConfig;
      }
    },
    {
      provide: Ipfs,
      useFactory: async (injector: Injector) => {
        let config = await injector.get(IpfsConfig);
        if (!config) {
          throw new Error(`ipfs config is needed`);
        }
        return new Promise((resolve, reject) => {
          let node = new IPFS(config);
          node.on("ready", (err: Error) => {
            if (err) return reject(err);
            resolve(node);
          });
          node.on("error", (err: Error) => {
            reject(err);
          });
        });
      },
      cache: true
    },
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        console.log("ipfs started");
        return await injector.get(Ipfs);
      }
    },
    {
      provide: Routes,
      useFactory: () => IpfsApi
    }
  ],
  imports: [ImsCloudServerModule]
})
export class ImsFsServerModule {}

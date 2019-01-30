import { ImsCloudServerModule } from "ims-cloud-server";
import { Module, AppInitialization } from "ims-common";
import { Ipfs, IpfsConfig, IpfsApi } from "ims-ipfs";
import { Injector, InjectionToken } from "ims-core";
import { Routes, Get } from "ims-cloud";

import { ImsFsServer } from "./fs";
const IPFS = require("ipfs");

@Module({
  providers: [
    {
      provide: IpfsApi,
      useFactory: (injector: Injector) => new ImsFsServer(injector)
    },
    {
      provide: Get,
      useFactory: async (injector: Injector) => {
        let api = await injector.get(
          InjectionToken.fromType<ImsFsServer>(ImsFsServer)
        );
        return {
          path: "/:hash/:method?",
          handler: async (req: any, res: any, next: any) => {
            let params = req.params;
            if (params.hash) {
              return await api.cat(params.hash);
            }
            next();
          }
        };
      }
    },
    {
      provide: IpfsConfig,
      useFactory: () => {
        return {
          repo: "./data",
          preload: {
            enabled: true,
            addresses: [
              "/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z",
              "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
              "/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
              "/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
              "/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
              "/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",
              "/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
              "/ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
              "/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx",
              "/ip6/2604:a880:1:20::1f9:9001/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z",
              "/ip6/2604:a880:1:20::203:d001/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
              "/ip6/2604:a880:0:1010::23:d001/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
              "/ip6/2400:6180:0:d0::151:6001/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
              "/ip6/2604:a880:800:10::4a:5001/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64",
              "/ip6/2a03:b0c0:0:1010::23:1001/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
              "/ip6/2a03:b0c0:1:d0::e7:1/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
              "/ip6/2604:a880:1:20::1d9:6001/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx",
              "/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
              "/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6"
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
          console.log("create ipfs node");
          node.on("ready", (err: Error) => {
            if (err) return reject(err);
            console.log("ipfs node ready");
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
export class ImsIpfsServerModule {}

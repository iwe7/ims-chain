import { Module, AppInitialization } from "ims-common";
import { Injector } from "ims-core";
import { Config, Routes, Fetch } from "ims-cloud";
import { Subject } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'

const obs = new Subject();
let ws: WebSocket;

function create(config: any, hash: string, pro: string) {
  return new Proxy(function () { }, {
    get(target: any, p: PropertyKey, receiver: any) {
      if (p === "then") {
        return void 0;
      }
      return create(config, hash, `${pro}.${p as string}`);
    },
    apply(target: any, thisArg: any, argArray?: any) {
      ws.send(JSON.stringify({
        hash,
        method: pro,
        params: argArray
      }));
      return obs.pipe(
        filter((res: any) => {
          return res.type === `${hash}.${pro}`
        }),
        map((res: any) => res.data),
        tap(res => console.log(res))
      );
    }
  });
}

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        let routes = await injector.get(Routes);
        let config = await injector.get(Config);
        ws = new WebSocket(`wss://viveka.cn/ws/`);
        ws.onmessage = (evt) => {
          const data = JSON.parse(evt.data);
          obs.next(data);
        }
        await new Promise((resolve, reject) => {
          ws.onopen = (evt) => {
            resolve();
          }
        });
        if (!config) config = { port: 4801, host: "localhost" };
        if (Array.isArray(routes)) {
          for (let route of routes) {
            injector.set(route, {
              fn: async (injector: Injector) => {
                let hash = await route.hash;
                return new Proxy(function () { }, {
                  get(target: any, p: PropertyKey, receiver: any) {
                    if (p === "then") {
                      return void 0;
                    }
                    return create(config, hash, `${p as string}`);
                  }
                });
              },
              token: route,
              useCache: true,
              value: undefined
            });
          }
        }
      }
    },
    {
      provide: Fetch,
      useFactory: () => fetch
    },
    {
      provide: Config,
      useFactory: () => {
        return {
          host: "./api"
        };
      }
    }
  ]
})
export class ImsCloudClientModule { }

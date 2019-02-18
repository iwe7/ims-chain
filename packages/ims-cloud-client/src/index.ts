import { Module, AppInitialization, Routes } from "ims-common";
import { Injector } from "ims-core";
import { Subject } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { join } from "path";
const root = process.cwd();
const cfg = require(join(root, 'config/ipns.json'));

const obs = new Subject();
let ws: WebSocket;

function create(hash: string, pro: string) {
  return new Proxy(function () { }, {
    get(target: any, p: PropertyKey, receiver: any) {
      if (p === "then") {
        return void 0;
      }
      return create(hash, `${pro}.${p as string}`);
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
        ws = new WebSocket(`wss://${cfg.wsUrl}`);
        ws.onmessage = (evt) => {
          const data = JSON.parse(evt.data);
          obs.next(data);
        }
        await new Promise((resolve, reject) => {
          ws.onopen = (evt) => {
            resolve();
          }
        });
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
                    return create(hash, `${p as string}`);
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
    }
  ]
})
export class ImsCloudClient { }

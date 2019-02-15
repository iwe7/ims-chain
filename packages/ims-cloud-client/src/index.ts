import { Module, AppInitialization } from "ims-common";
import { Injector } from "ims-core";
import { Config, Routes, Fetch } from "ims-cloud";

function create(config: any, hash: string, pro: string) {
  return new Proxy(function() {}, {
    get(target: any, p: PropertyKey, receiver: any) {
      if (p === "then") {
        return void 0;
      }
      return create(config, hash, `${pro}.${p as string}`);
    },
    apply(target: any, thisArg: any, argArray?: any) {
      let url = ``;
      if (config) {
        if (config.host) {
          url += config.host;
        } else {
          url += ".";
        }
        if (config.port) {
          url += `:` + config.port;
        }
      }
      url += `/${hash}/${pro}`;
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(argArray)
      }).then(res => {
        try {
          return res.json();
        } catch (e) {
          return res.text();
        }
      });
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
        if (!config) config = { port: 4801, host: "localhost" };
        if (Array.isArray(routes)) {
          for (let route of routes) {
            injector.set(route, {
              fn: async (injector: Injector) => {
                let hash = await route.hash;
                return new Proxy(function() {}, {
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
export class ImsCloudClientModule {}

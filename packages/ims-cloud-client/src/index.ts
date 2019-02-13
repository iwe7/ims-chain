import { Module, AppInitialization } from "ims-common";
import { Injector } from "ims-core";
import { Config, Routes, Fetch } from "ims-cloud";

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
                let fetch = await injector.get(Fetch);
                return new Proxy(function() {}, {
                  get(target: any, p: PropertyKey, receiver: any) {
                    if (p === "then") {
                      return void 0;
                    }
                    return new Proxy(function() {}, {
                      get(target: any, p1: PropertyKey, receiver: any) {
                        if (p === "then") {
                          return void 0;
                        }
                        return new Proxy(function() {}, {
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
                            url += `/${hash}/${p as string}.${p1 as string}`;
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
                        url += `/${hash}/${p as string}`;
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

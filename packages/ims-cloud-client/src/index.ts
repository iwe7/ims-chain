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
                      apply(target: any, thisArg: any, argArray?: any) {
                        return fetch(
                          `http://${config.host}:${
                            config.port
                          }/${hash}/${p as string}`,
                          {
                            method: "post",
                            body: JSON.stringify(argArray)
                          }
                        ).then(res => res.text());
                      }
                    });
                  }
                });
              },
              useCache: true,
              multi: false,
              value: undefined,
              deps: []
            });
          }
        }
      },
      deps: []
    }
  ]
})
export class ImsCloudClientModule {}

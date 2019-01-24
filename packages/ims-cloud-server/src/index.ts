import { Module, AppInitialization } from "ims-common";
import { Injector, isPromise } from "ims-core";
import express = require("express");
import bodyParser = require("body-parser");
import { Routes, Config } from "ims-cloud";
import { toString } from "./util";

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        let app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        let routes = await injector.get(Routes);
        if (Array.isArray(routes)) {
          for (let route of routes) {
            if (Array.isArray(route)) {
            } else {
              let hash = await route.hash;
              app.all(`/${hash}/:method`, async (req, res, next) => {
                let args = Array.isArray(req.body) ? req.body : [];
                let instance = await injector.get(route);
                let params = req.params;
                if (Reflect.has(instance, params.method)) {
                  let json = instance[params.method](...args);
                  if (isPromise(json)) {
                    json.then(data => res.end(toString(data)));
                  } else {
                    res.end(toString(json));
                  }
                }
              });
            }
          }
        }
        let config: any = await injector.get(Config);
        if (!config) config = { port: 4801, host: "localhost" };
        app.listen(config.port, (err: Error) => {
          if (err) throw err;
          console.log(
            `app start at http://${config.host || "localhost"}:${config.port ||
              "4200"}`
          );
        });
        return app;
      },
      deps: []
    }
  ]
})
export class ImsCloudServerModule {}

import { Module, AppInitialization } from "ims-common";
import { Injector } from "ims-core";
import express = require("express");
import bodyParser = require("body-parser");
import { Routes, Config, After } from "ims-cloud";
import { toString } from "./util";

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        let app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        let afters = await injector.get(After);
        if (afters) {
          if (Array.isArray(afters)) {
            afters.forEach(async after => {
              let item = await after;
              app.all(item.path, async (req, res, next) => {
                item &&
                  item.handler &&
                  res.end(await item.handler(req, res, next));
              });
            });
          }
        }
        let routes = await injector.get(Routes);
        if (Array.isArray(routes)) {
          for (let route of routes) {
            if (Array.isArray(route)) {
            } else {
              let hash = await route.hash;
              console.log(hash);
              app.all(`/${hash}/:method`, async (req, res, next) => {
                res.writeHead(200, {
                  "Content-Type": "text/html;charset=utf-8"
                });
                let data = ``;
                req.on("data", chunk => {
                  data += chunk.toString();
                });
                req.on("end", async () => {
                  let args = [];
                  if (data.length > 0) {
                    let parseData = JSON.parse(data);
                    if (Array.isArray(parseData)) {
                      args = parseData;
                    }
                  }
                  let instance = await injector.get(route);
                  let params = req.params;
                  if (Reflect.has(instance, params.method)) {
                    let json = await instance[params.method](...args);
                    res.end(toString(json));
                    return;
                  }
                });
              });
            }
          }
        }

        let config: any = await injector.get(Config);
        if (!config) config = { port: 4802, host: "localhost" };
        app.listen(config.port, (err: Error) => {
          if (err) throw err;
          console.log(
            `app start at http://${config.host || "localhost"}:${config.port ||
              "4200"}`
          );
        });
        return app;
      }
    }
  ]
})
export class ImsCloudServerModule {}

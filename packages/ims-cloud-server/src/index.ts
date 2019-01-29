import { Module, AppInitialization } from "ims-common";
import { Injector } from "ims-core";
import express = require("express");
import http = require("http");

import bodyParser = require("body-parser");
import { Routes, Config, Get } from "ims-cloud";
import { toString } from "./util";

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: () => {
        return async (injector: Injector) => {
          let app = express();
          let server = new http.Server(app);
          app.use(bodyParser.urlencoded({ extended: true }));
          app.use(bodyParser.json());
          let gets = await injector.get(Get);
          if (gets) {
            if (Array.isArray(gets)) {
              gets.forEach(async get => {
                let item = await get;
                app.get(item.path, async (req, res, next) => {
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
                app.post(`/${hash}/:method`, async (req, res, next) => {
                  debugger;
                  res.writeHead(200, {
                    "Content-Type": "text/html;charset=utf-8"
                  });
                  let data = ``;
                  req.on("data", chunk => {
                    data += chunk.toString();
                  });
                  req.on("end", async () => {
                    let args: any[] = [];
                    if (data.length > 0) {
                      let parseData = JSON.parse(data);
                      if (Array.isArray(parseData)) {
                        args = parseData;
                      }
                    }
                    let instance = await injector.get(route);
                    let params = req.params;
                    if (Reflect.has(instance, params.method)) {
                      try {
                        console.log(args);
                        let json = await instance[params.method](...args);
                        res.end(toString(json));
                        return;
                      } catch (e) {
                        res.end(
                          toString({
                            message: e.message
                          })
                        );
                        return;
                      }
                    } else {
                      next();
                    }
                  });
                });
              }
            }
          }
          let config: any = await injector.get(Config);
          if (!config) config = { port: 4802, host: "192.168.1.101" };
          server.listen(config.port, (err: Error) => {
            if (err) throw err;
            console.log(
              `app start at http://${config.host ||
                "localhost"}:${config.port || "4200"}`
            );
          });
          return server;
        };
      }
    }
  ]
})
export class ImsCloudServerModule {}

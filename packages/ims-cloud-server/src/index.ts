import { Module } from "ims-common";
import { Injector } from "ims-core";
import express = require("express");
import { Routes, Router } from "ims-cloud";
import { toString } from "./util";

function get(key: string, obj: any) {
  let keys: string[] = key.split(".");
  if (keys.length === 1) {
    return obj[keys[0]];
  } else {
    let _keys = keys.reverse();
    let key = _keys.pop();
    while (_keys.length > 0) {
      obj = obj[key];
      key = _keys.pop();
    }
    obj = obj[key];
    return obj;
  }
}

@Module({
  providers: [
    {
      provide: Router,
      useFactory: async (injector: Injector) => {
        let router = express.Router();
        let routes = await injector.get(Routes);
        if (Array.isArray(routes)) {
          for (let route of routes) {
            if (Array.isArray(route)) {
            } else {
              let hash = await route.hash;
              router.post(`/${hash}/:method`, async (req, res, next) => {
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
                  if (instance) {
                    try {
                      const method = get(params.method, instance);
                      let json = await method(...args);
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
        return router;
      }
    }
  ]
})
export class ImsCloudServerModule {}

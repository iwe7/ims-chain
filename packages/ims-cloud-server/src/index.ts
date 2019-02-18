import { Module, AppInitialization, getPath, Routes } from 'ims-common'
import { InjectionToken, Injector } from 'ims-core'
import { join } from 'path'
import express = require('express');
import http = require('http');
const app = express();
import { close } from 'ims-close-port'
import { ImsUser, ImsIpfs } from "ims-web";
import { ImsIpfsImpl, ImsUserImpl } from 'ims-web-impl'
import WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const root = process.cwd();
const cfg = require(join(root, 'config/ipns.json'));
@Module({
  imports: [],
  providers: [{
    provide: Routes,
    useFactory: () => {
      return [
        InjectionToken.fromType(ImsUser),
        InjectionToken.fromType(ImsIpfs)
      ];
    }
  }, {
    provide: InjectionToken.fromType(ImsIpfs),
    useFactory: async (injector: Injector) => {
      return await injector.get(ImsIpfsImpl);
    }
  },
  {
    provide: InjectionToken.fromType(ImsUser),
    useFactory: async (injector: Injector) => {
      return await injector.get(ImsUserImpl);
    }
  }, {
    provide: AppInitialization,
    useFactory: async (injector: Injector) => {
      const ipfs = await injector.get<ImsIpfs>(ImsIpfs);
      /**
       * 应用
       */
      app.get('/', async (req, res, next) => {
        const { h, p } = req.query;
        if (!h) {
          res.end(JSON.stringify({
            msg: 'not found'
          }));
        }
        const ipns = `/ipns/${h}${p || '/index.html'}`
        const resolve = await ipfs.name.resolve(ipns);
        const content = await ipfs.cat(resolve.name)
        res.end(content.content);
      });
      app.get('/favicon.ico', (req, res, next) => {
        res.sendFile(join(__dirname, 'favicon.ico'))
      });

      await close(cfg.port);
      wss.on('connection', (ws: WebSocket) => {
        ws.on('message', async (data: any) => {
          data = JSON.parse(data);
          const { hash, method, params } = data;
          const instance = await injector.getByHash(hash);
          const res = getPath(method, instance);
          res.value.bind(res.instance)(
            ...params
          ).subscribe(data => {
            try {
              data = data || {};
              ws.send(JSON.stringify({ type: `${hash}.${method}`, data }));
            } catch (e) {
              // debugger;
            }
          });
        })
      });
      server.listen(cfg.port, () => {
        console.log('ipns start')
      });
    }
  }]
})
export class ImsCloudServer { }

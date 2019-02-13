import { fetch } from "../fetch";
import { ImsNode } from "../node";
import { ImsMessage } from "../message";
import { ImsAddress, ImsPeerInfo } from "../peer";
import express = require("express");
import http = require("http");

export class ImsHttpNode extends ImsNode {
  info: ImsPeerInfo;
  friends: Set<ImsHttpNode> = new Set();
  constructor() {
    super();
  }
  async ready() {
    this.info = await ImsPeerInfo.create();
  }
  async fetch<T>(msg: ImsMessage<T>): Promise<ImsMessage> {
    return fetch(msg.to).then(res => res.json());
  }
  async listen(addr: ImsAddress): Promise<void> {
    return new Promise((resolve, reject) => {
      const app = express();
      const server = http.createServer(app);
      app.get("/", (req, res, next) => {
        res.end("hello");
      });
      server.listen(addr.port, addr.host, err => {
        if (err) return reject(err);
        const address = server.address();
        if (typeof address === "string") {
        } else {
          addr.port = addr.port || address.port;
          addr.family = addr.family || address.family;
          addr.host = addr.host || address.address;
        }
        this.info.add(addr);
        resolve();
      });
    });
  }
}

async function bootstrap() {
  const httpNode = new ImsHttpNode();
  await httpNode.ready();
  await httpNode.listen({
    port: 1234
  });
  console.log("bootstrap success");
  debugger;
}

bootstrap();

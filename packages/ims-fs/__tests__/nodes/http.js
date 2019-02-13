"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../fetch");
const node_1 = require("../node");
const peer_1 = require("../peer");
const express = require("express");
const http = require("http");
class ImsHttpNode extends node_1.ImsNode {
    constructor() {
        super();
        this.friends = new Set();
    }
    async ready() {
        this.info = await peer_1.ImsPeerInfo.create();
    }
    async fetch(msg) {
        return fetch_1.fetch(msg.to).then(res => res.json());
    }
    async listen(addr) {
        return new Promise((resolve, reject) => {
            const app = express();
            const server = http.createServer(app);
            app.get("/", (req, res, next) => {
                res.end("hello");
            });
            server.listen(addr.port, addr.host, err => {
                if (err)
                    return reject(err);
                const address = server.address();
                if (typeof address === "string") {
                }
                else {
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
exports.ImsHttpNode = ImsHttpNode;
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

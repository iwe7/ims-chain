"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./tcp/index");
const multiaddr = require("multiaddr");
let tcp = new index_1.TcpTransport();
let listener = tcp.createListener({}, (con) => {
    console.log("createListener", con);
});
let ma = multiaddr("/ip4/127.0.0.1/tcp/4200");
listener.listen(ma, (...args) => {
    console.log(`app listen`, args);
});
const conn = tcp.dial(ma, {}, (err, info) => {
    console.log("dial");
});
let addrs = conn.getObservedAddrs();
const source = conn.source;
let sourceRes = source(cb => {
    console.log(cb);
});
debugger;

import { TcpTransport, TcpConnection } from "./tcp/index";
const multiaddr = require("multiaddr");
let tcp = new TcpTransport();
let listener = tcp.createListener({}, (con: TcpConnection) => {
  console.log("createListener", con);
});
let ma = multiaddr("/ip4/127.0.0.1/tcp/4200");
listener.listen(ma, (...args: any[]) => {
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

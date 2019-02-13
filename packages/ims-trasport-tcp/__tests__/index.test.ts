import { TcpTransport } from "../lib/index";

const tcp = new TcpTransport();
const addr = "/ip4/127.0.0.1/tcp/1234";
const listener = tcp.listen(addr);
const connection = tcp.connect(addr);


debugger;

import { Transport, Connection, Listener } from "ims-transport";
export declare class TcpTransport extends Transport {
    constructor();
    connect(addr: string): Promise<Connection>;
    listen(addr: string): Promise<Listener>;
}
//# sourceMappingURL=transport.d.ts.map
/// <reference types="node" />
import { Connection } from "ims-transport";
import { Socket } from "net";
export declare class TcpConnection extends Connection {
    constructor();
    connect(addr: string): Socket;
}
//# sourceMappingURL=connection.d.ts.map
import { Transport, Listener, Connection } from "ims-transport";
import { Injector } from "ims-core";
export declare class UtpTransport extends Transport {
    injector: Injector;
    constructor(injector: Injector);
    connect(addr: string): Promise<Connection>;
    listen(addr: string): Promise<Listener>;
}
//# sourceMappingURL=transport.d.ts.map
import { Connection } from "./connection";
import { Listener } from "./listener";
import { Observable } from "rxjs";
export declare abstract class Transport extends Observable<any> {
    abstract connect(addr: string): Promise<Connection>;
    abstract listen(addr: string): Promise<Listener>;
}
export interface Network {
    addTransport(t: Transport): Error | null;
}
//# sourceMappingURL=transport.d.ts.map
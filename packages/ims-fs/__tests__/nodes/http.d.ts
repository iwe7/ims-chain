import { ImsNode } from "../node";
import { ImsMessage } from "../message";
import { ImsAddress, ImsPeerInfo } from "../peer";
export declare class ImsHttpNode extends ImsNode {
    info: ImsPeerInfo;
    friends: Set<ImsHttpNode>;
    constructor();
    ready(): Promise<void>;
    fetch<T>(msg: ImsMessage<T>): Promise<ImsMessage>;
    listen(addr: ImsAddress): Promise<void>;
}
//# sourceMappingURL=http.d.ts.map
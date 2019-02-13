import { ImsMessage } from "./message";
import { ImsAddress } from "./peer";
export declare abstract class ImsNode {
    abstract fetch<T>(msg: ImsMessage<T>): Promise<ImsMessage>;
    abstract listen(addr: ImsAddress): Promise<void>;
}
//# sourceMappingURL=node.d.ts.map
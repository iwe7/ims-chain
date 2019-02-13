import { ImsPeerId } from "./peer";
export declare type ImsMethod = string;
export interface ImsMessage<T = any> {
    method: ImsMethod;
    from: ImsPeerId;
    to: ImsPeerId;
    payload: T;
}
//# sourceMappingURL=message.d.ts.map
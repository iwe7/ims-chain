import { InjectionToken, StaticProvider } from "ims-core";
export interface WsClientFactory {
    (addr: string): WebSocket;
}
export declare const WsClientFactory: InjectionToken<WsClientFactory>;
export declare const providers: StaticProvider[];
export declare class WsClientModule {
}
export { WebSocketToken } from "./web-socket";
export { WsUrl } from "./ws-url";
//# sourceMappingURL=index.d.ts.map
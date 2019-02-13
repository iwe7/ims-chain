import { InjectionToken, StaticProvider, Injector } from "ims-core";
import { WsUrl, providers as wsUrlProviders } from "./ws-url";
import { WebSocketToken, providers as webSocketProviders } from "./web-socket";
import { Module } from "ims-common";
export interface WsClientFactory {
  (addr: string): WebSocket;
}
export const WsClientFactory = InjectionToken.fromString<WsClientFactory>(
  "WsClientFactory"
);
export const providers: StaticProvider[] = [
  {
    provide: WsClientFactory,
    useFactory: async (injector: Injector) => {
      const wsurl = await injector.get(WsUrl);
      const WsSocket = await injector.get(WebSocketToken);
      return (addr: string) => {
        const loc: Location =
          typeof window === "undefined"
            ? ({
                protocol: "http",
                host: "127.0.0.1",
                pathname: "/"
              } as Location)
            : window.location;
        let remoteAddress = wsurl(addr, loc);
        let socket = new WsSocket(remoteAddress);
        return socket;
      };
    }
  }
];

@Module({
  providers: [...providers, ...wsUrlProviders, ...webSocketProviders]
})
export class WsClientModule {}

export { WebSocketToken } from "./web-socket";
export { WsUrl } from "./ws-url";

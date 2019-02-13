import { InjectionToken, StaticProvider, Type } from "ims-core";
export const WebSocketToken = InjectionToken.fromString<Type<WebSocket>>(
  "WebSocket"
);
export const providers: StaticProvider[] = [
  {
    provide: WebSocketToken,
    useFactory: () => {
      return "undefined" === typeof WebSocket ? require("ws") : WebSocket;
    }
  }
];

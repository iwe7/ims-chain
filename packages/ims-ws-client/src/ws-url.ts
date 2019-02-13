import { InjectionToken, StaticProvider } from "ims-core";
const rurl = require("relative-url");
const map = { http: "ws", https: "wss" };
const def = "ws";
export interface WsUrl {
  (url: string, location?: Location): string;
}
export const WsUrl = InjectionToken.fromString<WsUrl>("WsUrl");
export const providers: StaticProvider[] = [
  {
    provide: WsUrl,
    useFactory: () => {
      return (url: string, location: Location = {} as any) =>
        rurl(url, location, map, def);
    }
  }
];

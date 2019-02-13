import { InjectionToken, Injector } from "ims-core";
import { Module } from "ims-common";
import { Multihash } from "ims-multihash";
const cids = require("cids");
export interface Cid {
  toBaseEncodedString(base?: string): string;
  toString(base?: string): string;
}
export interface CidFactory {
  (str: string | Buffer | object): Cid;
}
export const CidFactory = InjectionToken.fromString<CidFactory>("cid");

@Module({
  providers: [
    {
      provide: CidFactory,
      useFactory: async (injector: Injector) => {
        let multihash = await injector.get<Multihash>(Multihash);
        return (str: string | Buffer | object) => {
          if (typeof str === "string") {
            let data = Buffer.from(str);
            return new cids(multihash.digest(data));
          } else if (typeof str === "object") {
            let data = Buffer.from(JSON.stringify(str));
            return new cids(multihash.digest(data));
          } else {
            return new cids(multihash.digest(str));
          }
        };
      }
    }
  ]
})
export class CidModule {}

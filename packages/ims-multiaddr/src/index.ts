import { Module, InjectionToken } from "ims-common";

const multiaddr = require("multiaddr");

export abstract class Multiaddr {
  port: number;
  abstract tuples(): Array<[number, Buffer]>;
  abstract protoNames(): string[];
  abstract protoCodes(): number[];
  abstract protos(): { code: number; size: number; name: string }[];
  abstract toOptions(): {
    family: number;
    host: string;
    transport: string;
    port: number;
  };
  abstract stringTuples(): Array<[number, string]>;
  abstract nodeAddress(): {
    family: string;
    address: string;
    port: number;
  };
  abstract fromStupidString(str: string);
  abstract isThinWaistAddress(addr: any): boolean;
  abstract equals(addr: any): boolean;
  abstract encapsulate(addr: any);
  abstract decapsulate(addr: any);
}

export interface MultiaddrFactory {
  (address: string): Multiaddr;
}
export const MultiaddrFactory = InjectionToken.fromString<MultiaddrFactory>(
  "MultiaddrFactory"
);

@Module({
  providers: [
    {
      provide: MultiaddrFactory,
      useFactory: () => {
        return (address: string) => {
          return multiaddr(address);
        };
      }
    }
  ]
})
export class MultiaddrModule {}

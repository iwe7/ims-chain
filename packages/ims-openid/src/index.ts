import { InjectionToken, Injector } from "ims-core";
import { Module } from "ims-common";
import { PeerId, PeerIdModule } from "ims-peer-id";
import { CidModule, CidFactory } from "ims-cid";
export const Openid = InjectionToken.fromString<string>("openid");

@Module({
  providers: [
    {
      provide: Openid,
      useFactory: async (injector: Injector) => {
        let peerId = await injector.get<PeerId>(PeerId);
        let cidFact = await injector.get<CidFactory>(CidFactory);
        let pubKey = peerId.pubKey;
        return cidFact({
          pubKey,
          ip: "127.0.0.1",
          port: 3000
        }).toString();
      }
    }
  ],
  imports: [CidModule, PeerIdModule]
})
export class OpenidModule {}

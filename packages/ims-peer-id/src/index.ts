import { Module, InjectionToken } from "ims-common";
const Id = require("peer-id");

export function createPeerId() {
  return new Promise((resolve, reject) => {
    Id.create({ bits: 1024 }, (err, id) => {
      if (err) {
        reject(err);
      }
      resolve(id.toJSON());
    });
  });
}
export interface PeerId {
  id: string;
  privKey: string;
  pubKey: string;
}
export const PeerId = InjectionToken.fromString<PeerId>("peer_id");
@Module({
  providers: [
    {
      provide: PeerId,
      useFactory: () => createPeerId()
    }
  ]
})
export class PeerIdModule {}

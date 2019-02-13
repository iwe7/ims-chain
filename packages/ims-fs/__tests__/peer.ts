import PeerId = require("peer-id");

/**
 * 地址
 */
export interface ImsAddress {
  family?: string;
  host?: string;
  transport?: string;
  port: number;
}

/**
 * peer info
 */
export class ImsPeerInfo extends Set<ImsAddress> {
  constructor(public peer: ImsPeer) {
    super();
  }

  static async create(): Promise<ImsPeerInfo> {
    const peer = await ImsPeer.create();
    return new ImsPeerInfo(peer);
  }
}

/**
 * peer
 */
export class ImsPeer {
  constructor(
    /**
     * 地址
     */
    public id: ImsPeerId,
    /**
     * 私钥
     */
    public privKey?: ImsPeerPrivKey,
    /**
     * 公钥
     */
    public pubKey?: ImsPeerPubKey
  ) {}

  static create() {
    return new Promise<ImsPeer>((resolve, reject) => {
      PeerId.create({ bits: 1024 }, (err: Error, id: any) => {
        if (err) reject(err);
        const peerId = id.toJSON();
        resolve(new ImsPeer(peerId.id, peerId.privKey, peerId.pubKey));
      });
    });
  }
}

/**
 * peer id
 */
export type ImsPeerId = string;
/**
 * 私钥
 * peer priv key
 */
export type ImsPeerPrivKey = string;
/**
 * 公钥
 * peer pub key
 */
export type ImsPeerPubKey = string;

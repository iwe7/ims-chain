export interface PeerInfo {
  id: any;
}
export interface Connection {}
export interface Pushable {
  push: any;
}
export class Peer {
  conn: Connection;
  topics: Set<any> = new Set();
  stream: Pushable;
  private _references: number = 0;

  get isConnected(): boolean {
    return !!this.conn;
  }

  get isWritable(): boolean {
    return !!this.stream;
  }
  constructor(public info: PeerInfo) {}

  write(msg: Buffer) {
    if (!this.isWritable) {
      const id = this.info.id.toB58String();
      throw new Error("No writable connection to " + id);
    }
    this.stream.push(msg);
  }
}

import { Connection } from "./connection";
import { Listener } from "./listener";
import { Observable } from "rxjs";
export abstract class Transport extends Observable<any> {
  abstract connect(addr: string): Promise<Connection>;
  /**
   * 接口
   * @param addr
   */
  abstract listen(addr: string): Promise<Listener>;
  // abstract dial(): any;
  // abstract canDial(): boolean;
  // abstract protocols(): number[];
  // abstract proxy(): boolean;
}

export interface Network {
  // inet.Network
  addTransport(t: Transport): Error | null;
}

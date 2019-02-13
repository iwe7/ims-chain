import { Multiaddr } from "ims-multiaddr";
import { EventEmitter } from "events";
import { CallBack } from "./interface";

/**
 * 监听 用于接受消息
 */
export abstract class Listener extends EventEmitter {
  constructor(public options: any, public handler: any) {
    super();
  }
  abstract close(options: any, callback: CallBack): void;
  abstract listen(ma: Multiaddr, callback: CallBack): any;
  abstract getAddrs(): Multiaddr[];
}

import { Multiaddr } from "ims-multiaddr";
import { Listener } from "./listener";
import { Connection } from "./connection";
import { CallBack } from "./interface";

/**
 * 通信
 */
export abstract class Transport<O extends object = any> {
  /**
   * 拨号 建立链接
   * @param ma 地址
   * @param options 配置项目
   */
  abstract dial(ma: Multiaddr, options?: O, cb?: CallBack): Connection;
  /**
   * 设置监听
   * @param options 配置项目
   * @param handler 操作
   */
  abstract createListener(options: O, handler: Function): Listener;
  /**
   * 过滤
   * @param multiaddrs
   */
  abstract filter(multiaddrs: Multiaddr[]): Multiaddr[];
}

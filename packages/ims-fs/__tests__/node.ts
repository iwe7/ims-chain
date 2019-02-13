import { ImsMessage } from "./message";
import { ImsAddress } from "./peer";

/**
 * ims node
 * 节点
 */
export abstract class ImsNode {
  /**
   * 发送消息
   * @param msg 消息
   */
  abstract fetch<T>(msg: ImsMessage<T>): Promise<ImsMessage>;
  /**
   * 监听消息
   */
  abstract listen(addr: ImsAddress): Promise<void>;
}

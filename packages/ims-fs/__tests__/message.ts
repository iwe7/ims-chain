import { ImsPeerId } from "./peer";

export type ImsMethod = string;

/**
 * 通讯消息
 */
export interface ImsMessage<T = any> {
  /**
   * 方法
   */
  method: ImsMethod;
  /**
   * 消息发送方
   */
  from: ImsPeerId;
  /**
   * 消息接收方
   */
  to: ImsPeerId;
  /**
   * 消息内容
   */
  payload: T;
}

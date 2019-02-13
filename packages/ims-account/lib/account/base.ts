export interface ImsAccountAction<T = any> {
  type: string;
  payload: T;
}

export abstract class ImsAccountFactory {
  /**
   * 创建account
   * @param appid
   * @param appsecret
   * @param type
   */
  abstract create(appid: string, appsecret: string, type: string): ImsAccount;
  /**
   * 获取account
   * @param hash
   */
  abstract get(hash: string): ImsAccount;
}

export abstract class ImsAccount {
  /**
   * hash
   */
  hash: string;
  /**
   * appid
   */
  appid: string;
  /**
   * appsecret
   */
  appsecret: string;
  /**
   * 类型
   */
  type: string;
}

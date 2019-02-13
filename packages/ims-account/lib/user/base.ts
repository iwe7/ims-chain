export abstract class ImsUser {
  id: string;
  privKey: string;
  pubKey: string;
}
export abstract class ImsUserFactory {
  /**
   * 创建用户
   * @param id 地址
   * @param privKey 私钥
   * @param pubKey 公钥
   */
  abstract create(): ImsUser;
}

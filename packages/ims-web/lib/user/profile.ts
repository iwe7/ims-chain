export abstract class ImsUserProfile {
  /**
   * 账号信息
   */
  abstract base(): Promise<any>;
  abstract post(): Promise<any>;
  abstract bind(): Promise<any>;
  abstract validateMobile(): Promise<any>;
  abstract bindMobile(): Promise<any>;
  abstract unbind(): Promise<any>;
}

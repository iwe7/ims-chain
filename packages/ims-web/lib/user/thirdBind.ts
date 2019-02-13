export abstract class ImsUserThirdBind {
  /**
   * 账号信息
   */
  abstract display(): Promise<any>;
  abstract validateMobile(): Promise<any>;
  abstract bindMobile(): Promise<any>;
  abstract bindOauth(): Promise<any>;
}

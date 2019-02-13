export abstract class ImsUserRegister {
  /**
   * 账号信息
   */
  abstract display(): Promise<any>;
  abstract validMobile(): Promise<any>;
  abstract register(): Promise<any>;
  abstract checkUsername(): Promise<any>;
  abstract getExtendfields(): Promise<any>;
  abstract checkCode(): Promise<any>;
  abstract checkMobileCode(): Promise<any>;
  abstract checkPasswordSafe(): Promise<any>;
  abstract checkFailedCode(): Promise<any>;
}

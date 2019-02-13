export abstract class ImsUserSmsSign {
  /**
   * 账号信息
   */
  abstract display(): Promise<any>;
  abstract saveSmsSign(): Promise<any>;
  abstract changeStatus(): Promise<any>;
}

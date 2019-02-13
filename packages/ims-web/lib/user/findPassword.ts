/**
 * 找回密码
 */
export abstract class ImsUserFindPassword {
  /**
   * 验证手机号
   */
  abstract validMobile(): Promise<any>;
  /**
   * 短信验证码
   */
  abstract validCode(): Promise<any>;
  /**
   * 设置密码
   */
  abstract setPassword(): Promise<any>;
}

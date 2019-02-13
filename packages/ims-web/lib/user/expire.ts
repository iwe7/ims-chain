/**
 * 找回密码短信签名设置
 */
export abstract class ImsUserExpire {
  abstract display(): Promise<any>;
  abstract saveExpire(): Promise<any>;
  abstract changeStatus(): Promise<any>;
}

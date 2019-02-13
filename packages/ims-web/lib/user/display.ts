/**
 * 用户管理
 */
export abstract class ImsUserDisplay {
  abstract display(): Promise<any>;
  abstract operate(): Promise<any>;
}

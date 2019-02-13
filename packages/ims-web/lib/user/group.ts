/**
 * 用户组管理
 */
export abstract class ImsUserGroup {
  abstract post(): Promise<any>;
  abstract del(): Promise<any>;
  abstract display(): Promise<any>;
}

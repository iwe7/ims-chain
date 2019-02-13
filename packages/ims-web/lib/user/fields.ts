/**
 * 资料字段管理
 */
export abstract class ImsUserFields {
  abstract display(): Promise<any>;
  abstract post(): Promise<any>;
}

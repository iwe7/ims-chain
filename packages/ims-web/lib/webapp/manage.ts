/**
 * pc列表
 */
export abstract class ImsWebappManage {
  abstract create(): Promise<any>;
  abstract list(): Promise<any>;
  abstract createDisplay(): Promise<any>;
}

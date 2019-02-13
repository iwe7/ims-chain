export abstract class Dag {
  /**
   * 获取
   * @param key 通过路径获取
   */
  abstract get<T>(key: string): T;
  /**
   * 存储ipld
   * @param obj 要存储的内容
   * @param options 设置项目
   */
  abstract put(obj: any, options: any): string;
  /**
   * 枚举所有条目
   * @param key 域名
   */
  abstract tree(key: string): any;
}

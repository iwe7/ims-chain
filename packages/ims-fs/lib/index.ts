export type AbstractBatch<K = any, V = any> = PutBatch<K, V> | DelBatch<K, V>;

export interface PutBatch<K = any, V = any> {
  readonly type: "put";
  readonly key: K;
  readonly value: V;
}

export interface DelBatch<K = any, V = any> {
  readonly type: "del";
  readonly key: K;
}

export abstract class ImsFs {
  /**
   * 是否打开
   */
  abstract isOpen(): boolean;
  /**
   * 是否关闭
   */
  abstract isClosed(): boolean;
  /**
   * open
   */
  abstract open(): Promise<void>;
  /**
   * close
   */
  abstract close(): Promise<any>;
  /**
   * 批量处理
   */
  abstract batch(array: AbstractBatch[], options?: any): Promise<void>;
  /**
   * get
   * @param key
   */
  abstract get<T = any>(key: string): Promise<T>;
  /**
   * 保存
   * @param key
   * @param value
   */
  abstract put<T = any>(key: string, value: T): Promise<any>;
  /**
   * 删除
   * @param key
   */
  abstract del(key: string): Promise<any>;
  /**
   * read stream
   */
  abstract createReadStream(): NodeJS.ReadableStream;
  /**
   * key stream
   */
  abstract createKeyStream(): NodeJS.ReadableStream;
  /**
   * value stream
   */
  abstract createValueStream(): NodeJS.ReadableStream;
}

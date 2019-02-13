import { ImsFs, AbstractBatch } from "ims-fs";
import levelup, { LevelUp } from "levelup";
import leveldown from "leveldown";
export class ImsFsLevel extends ImsFs {
  db: LevelUp;
  constructor(location: string) {
    super();
    this.db = levelup(leveldown(location));
  }
  /**
   * 是否打开
   */
  isOpen(): boolean {
    return this.db.isOpen();
  }
  /**
   * 是否关闭
   */
  isClosed(): boolean {
    return this.db.isClosed();
  }
  /**
   * open
   */
  open(): Promise<void> {
    return this.db.open();
  }
  /**
   * close
   */
  close(): Promise<void> {
    return this.db.close();
  }
  /**
   * 批量处理
   */
  batch(array: AbstractBatch[], options?: any): Promise<void> {
    return this.db.batch(array, options);
  }
  /**
   * get
   * @param key
   */
  get<T = any>(key: string): Promise<T> {
    return this.db.get(key);
  }
  /**
   * 保存
   * @param key
   * @param value
   */
  put<T = any>(key: string, value: T): Promise<any> {
    return this.db.put(key, value);
  }
  /**
   * 删除
   * @param key
   */
  async del(key: string): Promise<any> {
    return this.db.del(key);
  }
  /**
   * read stream
   */
  createReadStream(): NodeJS.ReadableStream {
    return this.db.createReadStream();
  }
  /**
   * key stream
   */
  createKeyStream(): NodeJS.ReadableStream {
    return this.db.createKeyStream();
  }
  /**
   * value stream
   */
  createValueStream(): NodeJS.ReadableStream {
    return this.db.createValueStream();
  }
}

import { Folder } from "./folder";

export abstract class FileSystemEntry {
  /**
   * 文件名
   */
  readonly name: string;
  /**
   * 文件路径
   */
  readonly path: string;

  /**
   * 最后修改
   */
  readonly lastModified: Date;

  /**
   * 上级目录
   */
  readonly parent: Folder;

  /**
   * 移除
   */
  abstract remove(): Promise<void>;
  abstract removeSync(onError: (err?: Error) => any): void;

  /**
   * 重命名
   * @param newname
   */
  abstract rename(newname: string): Promise<void>;
  abstract renameSync(newname: string, onError?: (error: Error) => any): void;
}

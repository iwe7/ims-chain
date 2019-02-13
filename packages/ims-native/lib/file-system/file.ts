import { FileSystemEntry } from "./file-system-entry";
export abstract class File extends FileSystemEntry {
  /**
   * 后缀名
   */
  readonly extension: string;
  /**
   * 锁定
   */
  readonly isLocked: boolean;
  /**
   * 大小
   */
  readonly size: number;

  /**
   * 读取内容
   * @param onError
   */
  abstract readSync(onError?: (error: Error) => any): string;
  abstract writeSync(content: any, onError?: (error: any) => any): void;

  /**
   * 读取text
   * @param encoding
   */
  abstract readText(encoding?: string): Promise<string>;
  abstract readTextSync(
    onError?: (error: any) => any,
    encoding?: string
  ): string;

  /**
   * 写入text
   * @param content
   * @param encoding
   */
  abstract writeText(content: string, encoding?: string): Promise<void>;
  abstract writeTextSync(
    content: string,
    onError?: (error: any) => any,
    encoding?: string
  ): void;

  /**
   * 检查权限
   */
  abstract checkAccess(): void;
}

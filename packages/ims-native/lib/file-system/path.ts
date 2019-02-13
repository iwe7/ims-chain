export abstract class Path {
  abstract separator: string;
  abstract normalize(path: string): string;
  abstract join(...paths: string[]): string;
}

export abstract class KnownPath {
  /**
   * 文件
   */
  readonly documents: string;
  /**
   * 设置
   */
  readonly config: string;
  /**
   * 用户目录
   */
  readonly home: string;
  /**
   * 临时文件
   */
  readonly temp: string;
  /**
   * 库
   */
  readonly library: string;
  /**
   * 开发
   */
  readonly developer: string;
  /**
   * 桌面
   */
  readonly desktop: string;
  /**
   * 下载
   */
  readonly downloads: string;
  /**
   * 视频
   */
  readonly movies: string;
  /**
   * 音乐
   */
  readonly music: string;
  /**
   * 图片
   */
  readonly pictures: string;
  /**
   * 分享
   */
  readonly share: string;
}

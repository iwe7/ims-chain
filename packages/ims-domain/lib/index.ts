/**
 * 域名
 */
export class ImsDomain {
  /**
   * 域名
   */
  domain: string;
  /**
   * ip地址
   */
  ip: string;
  /**
   * 时间间隔
   */
  timeout: number = 60 * 60 * 1000;

  /**
   * 监听
   */
  listen() {
    this.refresh();
    setTimeout(() => {
      this.refresh();
    }, this.timeout);
  }

  /**
   * 刷新
   */
  refresh() {

  }
}

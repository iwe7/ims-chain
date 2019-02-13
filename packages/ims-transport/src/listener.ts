export abstract class Listener {
  abstract listen(addr: string): Promise<void>;
  /**
   * 标准
   */
  // abstract accept(): any;
  // abstract close(callback: (err: Error) => any): any;
  // abstract addr(): any;
  // abstract multiaddr(): any;
}

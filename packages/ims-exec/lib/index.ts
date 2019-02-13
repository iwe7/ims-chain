export abstract class ImsExec {
  readonly nginx: ImsExecNginx;
}

export abstract class ImsExecNginx {
  abstract reload(): void;
  /**
   * 开启
   */
  abstract start(): void;
  /**
   * 停止
   */
  abstract stop(): void;
}

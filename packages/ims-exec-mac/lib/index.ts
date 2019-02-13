import { ImsExec, ImsExecNginx } from "ims-exec";
import { exec, echo, exit } from "shelljs";

export class ImsExecMac extends ImsExec {
  readonly nginx: ImsExecNginxMac = new ImsExecNginxMac();
}
export class ImsExecNginxMac extends ImsExecNginx {
  private bin: string = "/usr/local/Cellar/nginx/1.15.8/bin/nginx";
  /**
   * 重新加载
   */
  reload(): void {
    const res = exec(`${this.bin} -s reload`);
    if (res.code !== 0) {
      echo(`Error:nginx.reload ${res.stderr}`);
    } else {
      echo(`Success:nginx.reload ${res.stdout}`);
    }
    exit(1);
  }
  /**
   * 开启
   */
  start(): void {
    const res = exec(`${this.bin}`);
    if (res.code !== 0) {
      echo(`Error:nginx.start ${res.stderr}`);
    } else {
      echo(`Success:nginx.start ${res.stdout}`);
    }
    exit(1);
  }
  /**
   * 停止
   */
  stop(): void {
    const res = exec(`${this.bin} -s stop`);
    if (res.code !== 0) {
      echo(`Error:nginx.stop ${res.stderr}`);
    } else {
      echo(`Success:nginx.stop ${res.stdout}`);
    }
    exit(1);
  }
}

const mac = new ImsExecMac();
mac.nginx.reload();

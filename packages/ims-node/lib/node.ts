import os = require("os");
export class ImsNode {
  /**
   * ip地址
   */
  ip: string;
  /**
   * 网卡
   */
  mac: string;
  /**
   * 端口号
   */
  port: number;

  constructor() {
    const nets = os.networkInterfaces();
    debugger;
    Object.keys(nets).map(key => {
      let net = nets[key];
      for (let n of net) {
        if (n.family === "IPv4" && !n.internal) {
          this.ip = n.address;
          this.mac = n.mac;
        }
      }
    });
  }
}

const node = new ImsNode();
debugger;

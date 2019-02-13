export class HostAddress {
  ip: string;
  port: number;
}

export class HostManaager {
  hostMap: Map<string, Host> = new Map();

  has(hash: string): boolean {
    return this.hostMap.has(hash);
  }

  get(hash: string): Host {
    if (this.has(hash)) {
      return this.hostMap.get(hash);
    }
  }

  set(host: Host): void {
    this.hostMap.set(host.hash, host);
  }
}

export class Host {
  addr: HostAddress;
  get hash() {
    return this.addr.ip + this.addr.port;
  }
}

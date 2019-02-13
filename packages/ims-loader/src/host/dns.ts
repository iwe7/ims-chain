import dns = require("dns");
export class Dns {
  constructor(public host: string) {}

  resolve(type: string = "A") {
    dns.resolve(this.host, type, (err: Error, address: string[]) => {
      console.log({ err, address });
      debugger;
    });
  }

  lookup() {
    dns.lookup(
      this.host,
      (err: NodeJS.ErrnoException, address: string, family: number) => {
        console.log({ err, address, family });
        debugger;
      }
    );
  }
}

let d = new Dns("test");
d.resolve();
d.lookup();

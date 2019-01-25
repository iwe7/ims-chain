const cids = require("cids");
const multihashing = require("multihashing-async");

export class InjectionToken<T = any> {
  get hash(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let str = this.toString();
      multihashing(Buffer.from(str), "sha2-256", (err: Error, res: any) => {
        if (err) return reject(err);
        let cid = new cids(0, "dag-pb", res);
        resolve(cid.toString());
      });
    });
  }

  constructor(
    public name: string,
    public desc: string,
    public multi: boolean = false
  ) {}

  toString(): string {
    return `[${this.name}]:${this.desc}`;
  }

  static fromString<T = any>(
    name: string,
    desc?: string,
    multi: boolean = false
  ) {
    return new InjectionToken<T>(name, desc || "", multi);
  }

  static fromType<T = any>(token: any, multi: boolean = false) {
    if (token instanceof InjectionToken) return token;
    return new InjectionToken<T>(token.name, `${stringify(token)}`, multi);
  }
}

export function stringify(token: any): string {
  if (typeof token === "string") {
    return token;
  }
  if (token instanceof Array) {
    return "[" + token.map(stringify).join(", ") + "]";
  }
  if (token == null) {
    return "" + token;
  }

  if (token.overriddenName) {
    return `[${token.overriddenName}]${token.toString()}`;
  }

  if (token.name) {
    return `[${token.name}]${token.toString()}`;
  }

  const res = token.toString();
  if (res == null) {
    return "" + res;
  }
  return res;
}

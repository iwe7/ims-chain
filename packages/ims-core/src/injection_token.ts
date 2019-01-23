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

  constructor(public name: string, public desc: string) {}

  toString(): string {
    return `[${this.name}]:${this.desc}`;
  }

  static fromString(name: string, desc?: string) {
    return new InjectionToken(name, desc || "");
  }

  static fromType(token: any) {
    return new InjectionToken(token.name, `${stringify(token)}`);
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cids = require("cids");
const multihashing = require("multihashing-async");
const type_1 = require("./type");
class InjectionToken {
    constructor(name, desc, multi = false) {
        this.name = name;
        this.desc = desc;
        this.multi = multi;
    }
    get hash() {
        return new Promise((resolve, reject) => {
            let str = this.toString();
            multihashing(Buffer.from(str), "sha2-256", (err, res) => {
                if (err)
                    return reject(err);
                let cid = new cids(0, "dag-pb", res);
                resolve(cid.toString());
            });
        });
    }
    toString() {
        return `[${this.name}]:${this.desc}`;
    }
    static fromString(name, desc, multi = false) {
        return new InjectionToken(name, desc || "", multi);
    }
    static fromType(token, multi = false) {
        if (token instanceof InjectionToken)
            return token;
        if (typeof token === "string")
            return this.fromString(token, token, multi);
        if (type_1.isType(token))
            return new InjectionToken(token.name, `${stringify(token)}`, multi);
        return new InjectionToken(token.name, `${stringify(token)}`, multi);
    }
}
exports.InjectionToken = InjectionToken;
function stringify(token) {
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
exports.stringify = stringify;

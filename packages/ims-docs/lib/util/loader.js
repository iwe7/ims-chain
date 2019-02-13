"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ipfs {
}
exports.Ipfs = Ipfs;
class Author {
}
exports.Author = Author;
class AuthorInfo {
}
exports.AuthorInfo = AuthorInfo;
class AuthorAddress {
    add() { }
    addSafe() { }
}
exports.AuthorAddress = AuthorAddress;
class Loader {
    async import(moduleName, normalizedParentName) { }
    async resolve(moduleName, parentName) { }
    async register(name, deps, declare) { }
    async set(moduleName, module) { }
    async get(moduleName) { }
    async delete(moduleName) { }
    async config(config) { }
}
exports.Loader = Loader;

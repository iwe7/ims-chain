"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrbitDB = require("orbit-db");
const ims_web_1 = require("ims-web");
const ipfsClient = require("ipfs-http-client");
class ImsDbImpl extends ims_web_1.ImsDb {
    constructor() {
        super();
        this.ipfs = ipfsClient("/ip4/127.0.0.1/tcp/5001");
        this.db = new OrbitDB(this.ipfs);
    }
}
exports.ImsDbImpl = ImsDbImpl;

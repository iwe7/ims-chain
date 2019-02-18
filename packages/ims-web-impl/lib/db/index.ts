import OrbitDB = require('orbit-db');
import { ImsDb } from 'ims-web'
import ipfsClient = require("ipfs-http-client");

export class ImsDbImpl extends ImsDb {
    db: any;
    ipfs: any;
    constructor() {
        super();
        this.ipfs = ipfsClient("/ip4/127.0.0.1/tcp/5001");
        this.db = new OrbitDB(this.ipfs);
    }
}

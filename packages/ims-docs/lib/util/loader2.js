"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ipfs_1 = require("./ipfs");
class Loader2 extends events_1.EventEmitter {
    constructor() {
        super();
        this.cacheName = new Map();
        this.cacheHash = new Map();
        this.on("register", data => {
            console.log(data);
        });
    }
    async ready() { }
    import(id) {
        this.cacheName;
    }
    async register(name, deps, fileContent) {
        const results = await ipfs_1.ipfs.add(Buffer.from(JSON.stringify({
            name,
            deps,
            fileContent
        })));
        const ipfsName = ipfs_1.ipfs.name;
        const addr = `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp`;
        const ress = await ipfsName.publish(addr, {
            resolve: true
        });
        debugger;
        return results;
    }
}
exports.Loader2 = Loader2;
async function bootstrap() {
    const loader = new Loader2();
    await loader.ready();
    loader.register("demo", [], `demo`).then(hash => {
        let l = loader.cacheName;
    });
}
bootstrap();

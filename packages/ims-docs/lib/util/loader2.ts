import { EventEmitter } from "events";
import { ipfs } from "./ipfs";

export class Loader2 extends EventEmitter {
  cacheName: Map<string, any> = new Map();
  cacheHash: Map<string, any> = new Map();
  constructor() {
    super();
    this.on("register", data => {
      console.log(data);
    });
  }
  async ready() {}
  import(id: string) {
    this.cacheName;
  }
  async register(name: string, deps: string[], fileContent: any) {
    const results = await ipfs.add(
      Buffer.from(
        JSON.stringify({
          name,
          deps,
          fileContent
        })
      )
    );
    const ipfsName = ipfs.name;
    const addr = `/ipfs/QmbezGequPwcsWo8UL4wDF6a8hYwM1hmbzYv2mnKkEWaUp`;
    const ress = await ipfsName.publish(addr, {
      resolve: true
    });
    debugger;
    return results;
  }
}

async function bootstrap() {
  const loader = new Loader2();
  await loader.ready();
  loader.register("demo", [], `demo`).then(hash => {
    let l = loader.cacheName;
  });
}

bootstrap();

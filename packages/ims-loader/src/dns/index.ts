import { Inject, Injectable, bootstrapModule, Module } from "ims-common";
import { Openid, OpenidModule } from "ims-openid";

@Injectable()
export class Dns {
  dnsCache: Map<string, any> = new Map();
  constructor(@Inject(Openid) public openind: string) {}

  async resolve(
    hash: string // hash: string
  ) {
    if (this.dnsCache.has(hash)) {
      return this.dnsCache.get(hash);
    }
    // 遍历查找
  }
}

@Module({
  imports: [OpenidModule]
})
export class ModuleTest {}

bootstrapModule(ModuleTest).then(async res => {
  let dns = await res.injector.get(Dns);
  debugger;
});

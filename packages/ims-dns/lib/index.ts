import { Module, bootstrapModule, AppInitialization } from 'ims-common'
import dgram = require('dgram');
import { Injector } from 'ims-core'
import { ImsIpfs } from 'ims-web'

@Module({
  providers: [{
    provide: AppInitialization,
    useFactory: async (injector: Injector) => {
      const server = dgram.createSocket('udp4');
      const ipfs = await injector.get<ImsIpfs>(ImsIpfs);
      const dnsKey = await ipfs.key.get('dns');
      const dnsId = dnsKey.id;
      try {
        const address = await ipfs.name.resolve(`/ipns/${dnsId}`);
        let dns = await ipfs.object.get(address);
        dns = dns || {};
      } catch (e) { }
    }
  }],
  imports: []
})
export class ImsDnsModule { }
bootstrapModule(ImsDnsModule);

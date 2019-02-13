import { Nat, Mapping } from "./base";
import * as util from "./util";
const natUpnp = require("nat-upnp");
export class NatUpnp extends Nat {
  constructor() {
    super("upnp");
  }
  async _addPortMapping(
    intPort: number,
    extPort: number,
    ttl?: number
  ): Promise<Mapping> {
    const activeIf = await util.getActiveInterface();
    const client = natUpnp.createClient();
    const mapping = this.newMapping(intPort);
    let ip = await util.externalIp(client);
    mapping.externalIp = ip;
    await util.portMapping(client, intPort, extPort, ttl);
    mapping.externalPort = extPort;
    mapping.internalPort = intPort;
    mapping.ttl = ttl;
    mapping.internalIp = activeIf.ip_address;
    client.close();
    return mapping;
  }
  async _removePortMapping(intPort: number, extPort: number): Promise<any> {
    const client = natUpnp.createClient();
    await util.portUnmapping(client, intPort, extPort);
    client.close();
    return;
  }
}

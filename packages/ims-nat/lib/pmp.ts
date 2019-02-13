import { Nat, Mapping } from "./base";
const natPmp = require("nat-pmp");
import * as util from "./util";
export class NatPMP extends Nat {
  constructor() {
    super("nat-pmp");
  }
  async _addPortMapping(
    intPort: number,
    extPort: number,
    ttl?: number
  ): Promise<Mapping> {
    const activeIf = await util.getActiveInterface();
    const client = natPmp.connect(activeIf.gateway_ip);
    const mapping = this.newMapping(intPort);
    mapping.routerIp = activeIf.gateway_ip;
    mapping.externalIp = ((await util.externalIp(client)) as any).ip.join(".");
    const info = await util.portMapping(client, intPort, extPort, ttl);
    mapping.externalPort = info.public;
    mapping.internalPort = info.private;
    mapping.internalIp = activeIf.ip_address;
    mapping.ttl = info.ttl;
    client.close();
    return mapping;
  }
  async _removePortMapping(intPort: number, extPort: number): Promise<any> {
    let routerIp = await util.getGatewayIp();
    const client = natPmp.connect(routerIp);
    let info = await util.portUnmapping(client, intPort, extPort);
    return info;
  }
}

export interface Mapping {
  routerIp: string;
  internalIp: string;
  internalPort: number;
  externalIp: string; // Only provided by PCP, undefined for other protocols
  externalPort: number; // The actual external port of the mapping, -1 on failure
  ttl: number; // The actual (response) lifetime of the mapping
  protocol: "nat-pmp" | "pcp" | "upnp"; // The protocol used to make the mapping ('natPmp', 'pcp', 'upnp')
  nonce: any; // Only for PCP; the nonce field for deletion
  errInfo: any; // Error message if failure; currently used only for UPnP
}
export abstract class Nat {
  mappings: { [key: string]: Mapping } = {};
  log: any;
  constructor(public name: "nat-pmp" | "pcp" | "upnp") {}
  newMapping(port: number): Mapping {
    return {
      routerIp: null,
      internalIp: null,
      internalPort: port,
      externalIp: null, // Only provided by PCP, undefined for other protocols
      externalPort: null, // The actual external port of the mapping, -1 on failure
      ttl: null, // The actual (response) lifetime of the mapping
      protocol: this.name, // The protocol used to make the mapping ('natPmp', 'pcp', 'upnp')
      nonce: null, // Only for PCP; the nonce field for deletion
      errInfo: null // Error message if failure; currently used only for UPnP
    };
  }
  async addMapping(
    intPort: number,
    extPort: number,
    ttl?: number
  ): Promise<Mapping> {
    ttl = !ttl ? 24 * 60 * 60 : ttl;
    let mapping = await this._addPortMapping(intPort, extPort, ttl);
    this.mappings[`${mapping.externalIp}:${mapping.externalPort}`] = mapping;
    return mapping;
  }
  async deleteMapping(mapping: Mapping) {
    delete this.mappings[`${mapping.externalIp}:${mapping.externalPort}`];
    await this._removePortMapping(mapping.internalPort, mapping.externalPort);
  }
  abstract _addPortMapping(
    intPort: number,
    extPort: number,
    ttl?: number
  ): Promise<Mapping>;
  abstract _removePortMapping(intPort: number, extPort: number): Promise<any>;
}

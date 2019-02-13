export * from "./pmp";
export * from "./upnp";
import * as util from "./util";
import { NatPMP } from "./pmp";
import { Nat } from "./base";
import { NatUpnp } from "./upnp";
import { EventEmitter } from "events";
import { Injectable } from "ims-common";
export type Mappers = [Nat, Nat];
export const defMappers: Mappers = [new NatPMP(), new NatUpnp()];
export interface NatManagerOptions {
  autorenew: boolean;
  every: number;
}
export interface KeyMapping {
  [key: string]: Nat;
}

@Injectable()
export class NatManager extends EventEmitter {
  activeMappings: KeyMapping = {};
  constructor(
    public mappers: Mappers = defMappers,
    public options: NatManagerOptions = {
      autorenew: true,
      every: 60 * 10 * 1000
    }
  ) {
    super();
    if (options.autorenew) {
      setInterval(() => {
        this.renewMappings();
      }, options.every);
    }
  }

  async renewMappings() {
    let ip = await this.getPublicIp();
    for (let key of Object.keys(this.activeMappings)) {
      const mapping = this.activeMappings[key].mappings[key];
      if (mapping.externalIp !== ip) {
        delete this.activeMappings[key];
        await this.addMapping(
          mapping.internalPort,
          mapping.externalPort,
          mapping.ttl
        );
      }
    }
  }
  async addMapping(intPort: number, extPort: number, ttl: number) {
    try {
      for (let mapper of this.mappers) {
        let mapping = await mapper.addMapping(intPort, extPort, ttl);
        const mapKey = `${mapping.externalIp}:${mapping.externalPort}`;
        this.activeMappings[mapKey] = mapper;
        this.emit("mapping", mapping);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deleteMapping(extPort: number, extIp?: string) {
    try {
      let ip = extIp || (await util.getPublicIp());
      const mapper = this.activeMappings[`${ip}:${extPort}`];
      let key = `${ip}:${extPort}`;
      const mapping = this.activeMappings[key].mappings[key];
      if (mapper) {
        await mapper.deleteMapping(mapping);
      }
    } catch (e) {}
  }

  async getPublicIp() {
    return util.getPublicIp();
  }

  async getGwIp() {
    return util.getGatewayIp();
  }
}

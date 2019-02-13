"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./pmp"), exports);
tslib_1.__exportStar(require("./upnp"), exports);
const util = require("./util");
const pmp_1 = require("./pmp");
const upnp_1 = require("./upnp");
const events_1 = require("events");
const ims_common_1 = require("ims-common");
exports.defMappers = [new pmp_1.NatPMP(), new upnp_1.NatUpnp()];
let NatManager = class NatManager extends events_1.EventEmitter {
    constructor(mappers = exports.defMappers, options = {
        autorenew: true,
        every: 60 * 10 * 1000
    }) {
        super();
        this.mappers = mappers;
        this.options = options;
        this.activeMappings = {};
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
                await this.addMapping(mapping.internalPort, mapping.externalPort, mapping.ttl);
            }
        }
    }
    async addMapping(intPort, extPort, ttl) {
        try {
            for (let mapper of this.mappers) {
                let mapping = await mapper.addMapping(intPort, extPort, ttl);
                const mapKey = `${mapping.externalIp}:${mapping.externalPort}`;
                this.activeMappings[mapKey] = mapper;
                this.emit("mapping", mapping);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async deleteMapping(extPort, extIp) {
        try {
            let ip = extIp || (await util.getPublicIp());
            const mapper = this.activeMappings[`${ip}:${extPort}`];
            let key = `${ip}:${extPort}`;
            const mapping = this.activeMappings[key].mappings[key];
            if (mapper) {
                await mapper.deleteMapping(mapping);
            }
        }
        catch (e) { }
    }
    async getPublicIp() {
        return util.getPublicIp();
    }
    async getGwIp() {
        return util.getGatewayIp();
    }
};
NatManager = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Array, Object])
], NatManager);
exports.NatManager = NatManager;

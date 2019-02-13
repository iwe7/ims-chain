"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network = require("network");
function getGatewayIp() {
    return new Promise((resolve, reject) => {
        network.get_gateway_ip((err, routerIp) => {
            if (err)
                return reject(err);
            resolve(routerIp);
        });
    });
}
exports.getGatewayIp = getGatewayIp;
function getActiveInterface() {
    return new Promise((resolve, reject) => {
        network.get_active_interface((err, activeIf) => {
            if (err)
                return reject(err);
            resolve(activeIf);
        });
    });
}
exports.getActiveInterface = getActiveInterface;
function portUnmapping(client, intPort, extPort) {
    return new Promise((resolve, reject) => {
        client.portUnmapping({
            private: intPort,
            public: extPort
        }, (err, info) => {
            client.close();
            if (err)
                return client(err);
            resolve(info);
        });
    });
}
exports.portUnmapping = portUnmapping;
function portMapping(client, intPort, extPort, ttl) {
    return new Promise((resolve, reject) => {
        client.portMapping({
            private: intPort,
            public: extPort,
            ttl
        }, (err, info) => {
            if (err)
                return reject(err);
            resolve(info);
        });
    });
}
exports.portMapping = portMapping;
function externalIp(client) {
    return new Promise((resolve, reject) => {
        client.externalIp((err, info) => {
            if (err)
                return reject(err);
            resolve(info);
        });
    });
}
exports.externalIp = externalIp;
function getPublicIp() {
    return new Promise((resolve, reject) => {
        network.get_public_ip((err, info) => {
            if (err)
                return reject(err);
            resolve(info);
        });
    });
}
exports.getPublicIp = getPublicIp;

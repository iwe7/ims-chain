"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const path_1 = require("path");
const express = require("express");
const http = require("http");
const app = express();
const ims_close_port_1 = require("ims-close-port");
const ims_web_1 = require("ims-web");
const ims_web_impl_1 = require("ims-web-impl");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const root = process.cwd();
const cfg = require(path_1.join(root, 'config/ipns.json'));
let ImsCloudServer = class ImsCloudServer {
};
ImsCloudServer = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [],
        providers: [{
                provide: ims_common_1.Routes,
                useFactory: () => {
                    return [
                        ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser),
                        ims_core_1.InjectionToken.fromType(ims_web_1.ImsIpfs)
                    ];
                }
            }, {
                provide: ims_core_1.InjectionToken.fromType(ims_web_1.ImsIpfs),
                useFactory: async (injector) => {
                    return await injector.get(ims_web_impl_1.ImsIpfsImpl);
                }
            },
            {
                provide: ims_core_1.InjectionToken.fromType(ims_web_1.ImsUser),
                useFactory: async (injector) => {
                    return await injector.get(ims_web_impl_1.ImsUserImpl);
                }
            }, {
                provide: ims_common_1.AppInitialization,
                useFactory: async (injector) => {
                    const ipfs = await injector.get(ims_web_1.ImsIpfs);
                    app.get('/', async (req, res, next) => {
                        const { h, p } = req.query;
                        if (!h) {
                            res.end(JSON.stringify({
                                msg: 'not found'
                            }));
                        }
                        const ipns = `/ipns/${h}${p || '/index.html'}`;
                        const resolve = await ipfs.name.resolve(ipns);
                        const content = await ipfs.cat(resolve.name);
                        res.end(content.content);
                    });
                    app.get('/favicon.ico', (req, res, next) => {
                        res.sendFile(path_1.join(__dirname, 'favicon.ico'));
                    });
                    await ims_close_port_1.close(cfg.port);
                    wss.on('connection', (ws) => {
                        ws.on('message', async (data) => {
                            data = JSON.parse(data);
                            const { hash, method, params } = data;
                            const instance = await injector.getByHash(hash);
                            const res = ims_common_1.getPath(method, instance);
                            res.value.bind(res.instance)(...params).subscribe(data => {
                                try {
                                    data = data || {};
                                    ws.send(JSON.stringify({ type: `${hash}.${method}`, data }));
                                }
                                catch (e) {
                                }
                            });
                        });
                    });
                    server.listen(cfg.port, () => {
                        console.log('ipns start');
                    });
                }
            }]
    })
], ImsCloudServer);
exports.ImsCloudServer = ImsCloudServer;

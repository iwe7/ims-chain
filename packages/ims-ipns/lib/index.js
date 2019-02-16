"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const ims_core_1 = require("ims-core");
const ims_web_1 = require("ims-web");
const path_1 = require("path");
const ims_web_impl_1 = require("ims-web-impl");
const express = require("express");
const app = express();
const ims_close_port_1 = require("ims-close-port");
let ImsIpnsModule = class ImsIpnsModule {
};
ImsIpnsModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [{
                provide: ims_core_1.InjectionToken.fromType(ims_web_1.ImsIpfs),
                useFactory: () => {
                    return new ims_web_impl_1.ImsIpfsImpl();
                },
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
                    await ims_close_port_1.close(6001);
                    app.listen(6001, () => {
                        console.log('ipns start');
                    });
                }
            }]
    })
], ImsIpnsModule);
exports.ImsIpnsModule = ImsIpnsModule;
ims_common_1.bootstrapModule(ImsIpnsModule);

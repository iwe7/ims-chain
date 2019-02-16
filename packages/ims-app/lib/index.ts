import { InjectionToken, Injector } from 'ims-core';
import { Module } from 'ims-common';
import express = require('express');
import { ImsIpfs } from 'ims-web';
export const AppRouter = InjectionToken.fromString('AppRouter');
export const IpnsRouter = InjectionToken.fromString('IpnsRouter');

@Module({
    providers: [{
        provide: IpnsRouter,
        useFactory: async (injector: Injector) => {
            const ipfs = await injector.get<ImsIpfs>(ImsIpfs)
            const router = express.Router();
            router.get('*', async (req, res, next) => {
                const path = req.path;
                const ipns = `/ipns/${path}`
                const resolve = await ipfs.name.resolve(ipns);
                const content = await ipfs.cat(resolve.name)
                res.end(content.content);
            });
            return router;
        }
    }, {
        provide: AppRouter,
        useFactory: async (injector: Injector) => {
            const ipfs = await injector.get<ImsIpfs>(ImsIpfs)
            const router = express.Router();
            router.get('*', async (req, res, next) => {
                const { h, p } = req.query;
                if (!h) {
                    res.end(JSON.stringify({
                        msg: 'not found'
                    }));
                }
                const ipns = `/ipns/${h}/${p || 'index.html'}`
                const resolve = await ipfs.name.resolve(ipns);
                const content = await ipfs.cat(resolve.name)
                res.end(content.content);
            });
            return router;
        }
    }]
})
export class ImsAppModule { }

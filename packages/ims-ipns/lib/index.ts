import { Module, bootstrapModule, AppInitialization } from 'ims-common'
import { InjectionToken, Injector } from 'ims-core'
import { ImsIpfs } from 'ims-web'
import { join } from 'path'

import { ImsIpfsImpl } from 'ims-web-impl'
import express = require('express');
const app = express();
import { close } from 'ims-close-port'
@Module({
    providers: [{
        provide: InjectionToken.fromType(ImsIpfs),
        useFactory: () => {
            return new ImsIpfsImpl()
        },
    }, {
        provide: AppInitialization,
        useFactory: async (injector: Injector) => {
            const ipfs = await injector.get<ImsIpfs>(ImsIpfs)
            app.get('/', async (req, res, next) => {
                const { h, p } = req.query;
                if (!h) {
                    res.end(JSON.stringify({
                        msg: 'not found'
                    }));
                }
                const ipns = `/ipns/${h}${p || '/index.html'}`
                const resolve = await ipfs.name.resolve(ipns);
                const content = await ipfs.cat(resolve.name)
                res.end(content.content);
            });
            app.get('/favicon.ico', (req, res, next) => {
                res.sendFile(join(__dirname, 'favicon.ico'))
            });
            await close(6001);
            app.listen(6001, () => {
                console.log('ipns start')
            });
        }
    }]
})
export class ImsIpnsModule { }
bootstrapModule(ImsIpnsModule);

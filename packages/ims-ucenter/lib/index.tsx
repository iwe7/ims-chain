import { Module, AppInitialization, bootstrapModule } from 'ims-common';
import { Injector } from 'ims-core';
import { render } from 'react-dom';

import React = require('react');
import { ImsUcenter } from './pages'

@Module({
    providers: [{
        provide: AppInitialization,
        useFactory: async (injector: Injector) => {
            render(<ImsUcenter />, document.getElementById('app'))
        }
    }],
    imports: []
})
export class ImsUcenterModule { }
bootstrapModule(ImsUcenterModule);

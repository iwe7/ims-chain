import { bootstrapModule, Injectable, Entry } from 'ims-common';
import { ImsAddonsModule, ImsModulesBindings, ImsModules } from './index';
import { Repository } from 'typeorm';

@Injectable()
export class ImsTest {
    constructor(
        @Entry(ImsModules) public modules: Repository<ImsModules>,
        @Entry(ImsModulesBindings) public modulesBindings: Repository<ImsModulesBindings>
    ) { }
}

bootstrapModule(ImsAddonsModule).then(async res => {
    const test = await res.injector.get(ImsTest)
    debugger;
});

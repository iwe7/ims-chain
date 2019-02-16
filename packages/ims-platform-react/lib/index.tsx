import { Module, AppInitialization, bootstrapModule, Page } from 'ims-common';
import { Injector } from 'ims-core';
import { ImsSdk } from 'ims-sdk'
import { ImsSdkH5 } from 'ims-sdk-h5'
import { InjectionToken } from 'ims-common'
import React = require('react');
import { bootstrap } from './bootstrap';

export class AppIndex extends React.Component {
    async go() {
        const sdk = await Injector.get<ImsSdk>(ImsSdk);
        sdk.navigateTo('/home')
    }
    render() {
        return <div>AppIndex 首页
            <button onClick={e => {
                this.go();
            }}>AppHome</button>
        </div>
    }
}

export class AppHome extends React.Component {
    async go() {
        const sdk = await Injector.get<ImsSdk>(ImsSdk);
        sdk.navigateTo('/')
    }
    render() {
        return <div>AppHome 个人中心
            <button onClick={e => {
                this.go();
            }}>AppIndex</button>
        </div>
    }
}

@Module({
    providers: [
        {
            provide: InjectionToken.fromType(ImsSdk),
            useFactory: async (injector: Injector) => {
                return await injector.get(ImsSdkH5)
            }
        },
        {
            provide: Page,
            useFactory: () => {
                return {
                    path: '/',
                    component: AppIndex
                } as Page
            }
        },
        {
            provide: Page,
            useFactory: () => {
                return {
                    path: '/home',
                    component: AppHome
                } as Page
            }
        },
        {
            provide: AppInitialization,
            useFactory: async (injector: Injector) => {
                const pages = await injector.get<Page[]>(Page);
                bootstrap(pages, injector, document.getElementById('app'))
            }
        }
    ]
})
export class ImsPlatformReact { }
bootstrapModule(ImsPlatformReact);

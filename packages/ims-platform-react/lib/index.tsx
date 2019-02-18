import { Module, AppInitialization, bootstrapModule, Page } from 'ims-common';
import { Injector } from 'ims-core';
import { ImsSdk } from 'ims-sdk'
import { ImsSdkH5 } from 'ims-sdk-h5'
import { InjectionToken } from 'ims-common'
import React = require('react');
import "./index.scss";
import { ImsIpfs, ImsUser } from 'ims-web';
import { Routes } from 'ims-cloud'
import { ImsCloudClientModule } from 'ims-cloud-client';

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
    imports: [
        ImsCloudClientModule
    ],
    providers: [
        {
            provide: Routes,
            useFactory: () => [
                InjectionToken.fromType(ImsUser),
                InjectionToken.fromType(ImsIpfs)
            ]
        },
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
                    component: AppIndex,
                    title: '首页'
                } as Page
            }
        },
        {
            provide: Page,
            useFactory: () => {
                return {
                    path: '/home',
                    component: AppHome,
                    title: '我的'
                } as Page
            }
        },
        {
            provide: AppInitialization,
            useFactory: async (injector: Injector) => {
                const sdk = await injector.get<ImsSdk>(ImsSdk);
                await sdk.ready();
            }
        }
    ]
})
export class ImsPlatformReact { }
bootstrapModule(ImsPlatformReact);

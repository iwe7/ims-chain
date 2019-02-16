import { InjectionToken } from 'ims-core';
export interface App {
    [key: string]: any;
    onLaunch: Function;
    onShow: Function;
    onHide: Function;
    onError: Function;
    onPageNotFound: Function;
}
export const App = InjectionToken.fromString<App>('App', 'App Desc')
export interface Page {
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
    component?: any;
}
export const Page = InjectionToken.fromString<Page[]>('Page', 'Page', true)

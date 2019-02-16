import { InjectionToken } from 'ims-core';
export interface App {
    [key: string]: any;
    onLaunch: Function;
    onShow: Function;
    onHide: Function;
    onError: Function;
    onPageNotFound: Function;
}
export declare const App: InjectionToken<App>;
export interface Page {
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
    component?: any;
}
export declare const Page: InjectionToken<Page[]>;
//# sourceMappingURL=app.d.ts.map
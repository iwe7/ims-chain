import { ImsSdk } from 'ims-sdk';
import { QueryString, Injector } from 'ims-common';
import { History } from 'history';
import React = require('react');
export declare class Page404 extends React.Component {
    render(): JSX.Element;
}
export interface AppFooterProps {
    list: any[];
}
export declare class AppFooter extends React.Component<AppFooterProps, any> {
    click(e: any): Promise<void>;
    render(): JSX.Element;
}
export declare class ImsSdkH5 extends ImsSdk {
    ps: QueryString;
    injector: Injector;
    history: History;
    pages: string[];
    window: any;
    title: string;
    tabBar: any;
    constructor(ps: QueryString, injector: Injector);
    ready(): Promise<void>;
    private renderTo;
    switchTab(url: string): Promise<any>;
    reLaunch(path: string): Promise<any>;
    redirectTo(path: string): Promise<any>;
    navigateTo(path: string): Promise<any>;
    navigateBack(delta: number): Promise<any>;
    showToast(): Promise<any>;
    showModal(): Promise<any>;
    showLoading(): Promise<any>;
    showActionSheet(): Promise<any>;
    hideToast(): Promise<any>;
    hideLoading(): Promise<any>;
    showNavigationBarLoading(): Promise<any>;
    setNavigationBarTitle(title: string): Promise<any>;
    setNavigationBarColor(): Promise<any>;
    hideNavigationBarLoading(): Promise<any>;
    setBackgroundTextStyle(): Promise<any>;
    setBackgroundColor(): Promise<any>;
    showTabBarRedDot(): Promise<any>;
    showTabBar(): Promise<any>;
    setTabBarStyle(): Promise<any>;
    setTabBarItem(): Promise<any>;
    setTabBarBadge(): Promise<any>;
    removeTabBarBadge(): Promise<any>;
    hideTabBarRedDot(): Promise<any>;
    hideTabBar(): Promise<any>;
    loadFontFace(): Promise<any>;
    stopPullDownRefresh(): Promise<any>;
    startPullDownRefresh(): Promise<any>;
    pageScrollTo(): Promise<any>;
    setTopBarText(): Promise<any>;
    nextTick(): Promise<any>;
    getMenuButtonBoundingClientRect(): Promise<any>;
    onWindowResize(): Promise<any>;
    offWindowResize(): Promise<any>;
    onKeyboardHeightChange(): Promise<any>;
    createAnimation(): any;
    request(): any;
    downloadFile(): any;
    uploadFile(): any;
    sendSocketMessage(): Promise<any>;
    onSocketOpen(): Promise<any>;
    onSocketMessage(): Promise<any>;
    onSocketError(): Promise<any>;
    onSocketClose(): Promise<any>;
    connectSocket(): Promise<any>;
    closeSocket(): Promise<any>;
    stopLocalServiceDiscovery(): Promise<any>;
    startLocalServiceDiscovery(): Promise<any>;
    onLocalServiceResolveFail(): Promise<any>;
    onLocalServiceLost(): Promise<any>;
    onLocalServiceFound(): Promise<any>;
    onLocalServiceDiscoveryStop(): Promise<any>;
    offLocalServiceResolveFail(): Promise<any>;
    offLocalServiceLost(): Promise<any>;
    offLocalServiceFound(): Promise<any>;
    offLocalServiceDiscoveryStop(): Promise<any>;
    setStorageSync(): Promise<any>;
    setStorage(): Promise<any>;
    removeStorageSync(): Promise<any>;
    removeStorage(): Promise<any>;
    getStorageSync(): Promise<any>;
    getStorageInfoSync(): Promise<any>;
    getStorageInfo(): Promise<any>;
    getStorage(): Promise<any>;
    clearStorageSync(): Promise<any>;
    clearStorage(): Promise<any>;
    createMapContext(): Promise<any>;
    saveImageToPhotosAlbum(): Promise<any>;
    previewImage(): Promise<any>;
    getImageInfo(): Promise<any>;
    compressImage(): Promise<any>;
    chooseMessageFile(): Promise<any>;
    chooseImage(): Promise<any>;
    saveVideoToPhotosAlbum(): Promise<any>;
    createVideoContext(): Promise<any>;
    chooseVideo(): Promise<any>;
    stopVoice(): Promise<any>;
    setInnerAudioOption(): Promise<any>;
    playVoice(): Promise<any>;
    pauseVoice(): Promise<any>;
    getAvailableAudioSources(): Promise<any>;
    createInnerAudioContext(): Promise<any>;
    createAudioContext(): Promise<any>;
    stopBackgroundAudio(): Promise<any>;
    seekBackgroundAudio(): Promise<any>;
    playBackgroundAudio(): Promise<any>;
    pauseBackgroundAudio(): Promise<any>;
    onBackgroundAudioStop(): Promise<any>;
    onBackgroundAudioPlay(): Promise<any>;
    onBackgroundAudioPause(): Promise<any>;
    getBackgroundAudioPlayerState(): Promise<any>;
    getBackgroundAudioManager(): Promise<any>;
    createLivePusherContext(): Promise<any>;
    createLivePlayerContext(): Promise<any>;
    stopRecord(): Promise<any>;
    startRecord(): Promise<any>;
    getRecorderManager(): Promise<any>;
    createCameraContext(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
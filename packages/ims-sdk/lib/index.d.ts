export declare abstract class ImsSdk {
    abstract switchTab(url: string): Promise<any>;
    abstract reLaunch(url: string): Promise<any>;
    abstract redirectTo(url: string): Promise<any>;
    abstract navigateTo(url: string): Promise<any>;
    abstract navigateBack(delta: number): Promise<any>;
    abstract showToast(): Promise<any>;
    abstract showModal(): Promise<any>;
    abstract showLoading(): Promise<any>;
    abstract showActionSheet(): Promise<any>;
    abstract hideToast(): Promise<any>;
    abstract hideLoading(): Promise<any>;
    abstract showNavigationBarLoading(): Promise<any>;
    abstract setNavigationBarTitle(): Promise<any>;
    abstract setNavigationBarColor(): Promise<any>;
    abstract hideNavigationBarLoading(): Promise<any>;
    abstract setBackgroundTextStyle(): Promise<any>;
    abstract setBackgroundColor(): Promise<any>;
    abstract showTabBarRedDot(): Promise<any>;
    abstract showTabBar(): Promise<any>;
    abstract setTabBarStyle(): Promise<any>;
    abstract setTabBarItem(): Promise<any>;
    abstract setTabBarBadge(): Promise<any>;
    abstract removeTabBarBadge(): Promise<any>;
    abstract hideTabBarRedDot(): Promise<any>;
    abstract hideTabBar(): Promise<any>;
    abstract loadFontFace(): Promise<any>;
    abstract stopPullDownRefresh(): Promise<any>;
    abstract startPullDownRefresh(): Promise<any>;
    abstract pageScrollTo(): Promise<any>;
    abstract setTopBarText(): Promise<any>;
    abstract nextTick(): Promise<any>;
    abstract getMenuButtonBoundingClientRect(): Promise<any>;
    abstract onWindowResize(): Promise<any>;
    abstract offWindowResize(): Promise<any>;
    abstract onKeyboardHeightChange(): Promise<any>;
    abstract createAnimation(): any;
    abstract request(): any;
    abstract downloadFile(): any;
    abstract uploadFile(): any;
    abstract sendSocketMessage(): Promise<any>;
    abstract onSocketOpen(): Promise<any>;
    abstract onSocketMessage(): Promise<any>;
    abstract onSocketError(): Promise<any>;
    abstract onSocketClose(): Promise<any>;
    abstract connectSocket(): Promise<any>;
    abstract closeSocket(): Promise<any>;
    abstract stopLocalServiceDiscovery(): Promise<any>;
    abstract startLocalServiceDiscovery(): Promise<any>;
    abstract onLocalServiceResolveFail(): Promise<any>;
    abstract onLocalServiceLost(): Promise<any>;
    abstract onLocalServiceFound(): Promise<any>;
    abstract onLocalServiceDiscoveryStop(): Promise<any>;
    abstract offLocalServiceResolveFail(): Promise<any>;
    abstract offLocalServiceLost(): Promise<any>;
    abstract offLocalServiceFound(): Promise<any>;
    abstract offLocalServiceDiscoveryStop(): Promise<any>;
    abstract setStorageSync(): Promise<any>;
    abstract setStorage(): Promise<any>;
    abstract removeStorageSync(): Promise<any>;
    abstract removeStorage(): Promise<any>;
    abstract getStorageSync(): Promise<any>;
    abstract getStorageInfoSync(): Promise<any>;
    abstract getStorageInfo(): Promise<any>;
    abstract getStorage(): Promise<any>;
    abstract clearStorageSync(): Promise<any>;
    abstract clearStorage(): Promise<any>;
    abstract createMapContext(): Promise<any>;
    abstract saveImageToPhotosAlbum(): Promise<any>;
    abstract previewImage(): Promise<any>;
    abstract getImageInfo(): Promise<any>;
    abstract compressImage(): Promise<any>;
    abstract chooseMessageFile(): Promise<any>;
    abstract chooseImage(): Promise<any>;
    abstract saveVideoToPhotosAlbum(): Promise<any>;
    abstract createVideoContext(): Promise<any>;
    abstract chooseVideo(): Promise<any>;
    abstract stopVoice(): Promise<any>;
    abstract setInnerAudioOption(): Promise<any>;
    abstract playVoice(): Promise<any>;
    abstract pauseVoice(): Promise<any>;
    abstract getAvailableAudioSources(): Promise<any>;
    abstract createInnerAudioContext(): Promise<any>;
    abstract createAudioContext(): Promise<any>;
    abstract stopBackgroundAudio(): Promise<any>;
    abstract seekBackgroundAudio(): Promise<any>;
    abstract playBackgroundAudio(): Promise<any>;
    abstract pauseBackgroundAudio(): Promise<any>;
    abstract onBackgroundAudioStop(): Promise<any>;
    abstract onBackgroundAudioPlay(): Promise<any>;
    abstract onBackgroundAudioPause(): Promise<any>;
    abstract getBackgroundAudioPlayerState(): Promise<any>;
    abstract getBackgroundAudioManager(): Promise<any>;
    abstract createLivePusherContext(): Promise<any>;
    abstract createLivePlayerContext(): Promise<any>;
    abstract stopRecord(): Promise<any>;
    abstract startRecord(): Promise<any>;
    abstract getRecorderManager(): Promise<any>;
    abstract createCameraContext(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
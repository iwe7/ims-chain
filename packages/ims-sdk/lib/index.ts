export abstract class ImsSdk {
    abstract ready(): Promise<any>;
    /**
     * 路由
     */
    abstract switchTab(url: string): Promise<any>;
    abstract reLaunch(url: string): Promise<any>;
    /**
     * 关闭当前页面，跳转到应用内的某个页面
     * 但是不允许跳转到 tabbar 页面
     */
    abstract redirectTo(url: string): Promise<any>;
    /**
     * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
     */
    abstract navigateTo(url: string): Promise<any>;
    /**
     * 关闭当前页面，返回上一页面或多级页面
     */
    abstract navigateBack(delta: number): Promise<any>;

    /**
     * 界面
     */

    /**
     * 交互
     */
    abstract showToast(): Promise<any>;
    abstract showModal(): Promise<any>;
    abstract showLoading(): Promise<any>;
    abstract showActionSheet(): Promise<any>;
    abstract hideToast(): Promise<any>;
    abstract hideLoading(): Promise<any>;

    /**
     * 导航栏
     */
    abstract showNavigationBarLoading(): Promise<any>;
    abstract setNavigationBarTitle(title: string): Promise<any>;
    abstract setNavigationBarColor(): Promise<any>;
    abstract hideNavigationBarLoading(): Promise<any>;

    /**
     * 背景
     */
    abstract setBackgroundTextStyle(): Promise<any>;
    abstract setBackgroundColor(): Promise<any>;

    /**
     * tab bar
     */
    abstract showTabBarRedDot(): Promise<any>;
    abstract showTabBar(): Promise<any>;
    abstract setTabBarStyle(): Promise<any>;
    abstract setTabBarItem(): Promise<any>;
    abstract setTabBarBadge(): Promise<any>;
    abstract removeTabBarBadge(): Promise<any>;
    abstract hideTabBarRedDot(): Promise<any>;
    abstract hideTabBar(): Promise<any>;

    /**
     * 字体
     */
    abstract loadFontFace(): Promise<any>;
    /**
     * 下拉刷新
     */
    abstract stopPullDownRefresh(): Promise<any>;
    abstract startPullDownRefresh(): Promise<any>;

    /**
     * 滚动
     */
    abstract pageScrollTo(): Promise<any>;

    /**
     * 置顶
     */
    abstract setTopBarText(): Promise<any>;


    /**
     * 自定义组件
     */
    abstract nextTick(): Promise<any>;

    /**
     * 菜单
     */
    abstract getMenuButtonBoundingClientRect(): Promise<any>;

    /**
     * 窗口
     */
    abstract onWindowResize(): Promise<any>;
    abstract offWindowResize(): Promise<any>;

    /**
     * 键盘
     */
    abstract onKeyboardHeightChange(): Promise<any>;

    /**
     * 动画
     */
    abstract createAnimation(): any;


    /**
     * 网络
     */

    /**
     * 发起请求
     */
    abstract request(): any;

    /**
     * 下载
     */
    abstract downloadFile(): any;

    /**
     * 下载
     */
    abstract uploadFile(): any;

    /**
     * web sockets
     */
    abstract sendSocketMessage(): Promise<any>;
    abstract onSocketOpen(): Promise<any>;
    abstract onSocketMessage(): Promise<any>;
    abstract onSocketError(): Promise<any>;
    abstract onSocketClose(): Promise<any>;
    abstract connectSocket(): Promise<any>;
    abstract closeSocket(): Promise<any>;

    /**
     * mdns
     */
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

    /**
     * 数据缓存
     */
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
    /**
     * 媒体
     */

    /**
     * 地图
     */
    abstract createMapContext(): Promise<any>;

    /**
     * 图片
     */
    abstract saveImageToPhotosAlbum(): Promise<any>;
    abstract previewImage(): Promise<any>;
    abstract getImageInfo(): Promise<any>;
    abstract compressImage(): Promise<any>;
    abstract chooseMessageFile(): Promise<any>;
    abstract chooseImage(): Promise<any>;

    /**
     * 视频
     */
    abstract saveVideoToPhotosAlbum(): Promise<any>;
    abstract createVideoContext(): Promise<any>;
    abstract chooseVideo(): Promise<any>;

    /**
     * 音频
     */
    abstract stopVoice(): Promise<any>;
    abstract setInnerAudioOption(): Promise<any>;
    abstract playVoice(): Promise<any>;
    abstract pauseVoice(): Promise<any>;
    abstract getAvailableAudioSources(): Promise<any>;
    abstract createInnerAudioContext(): Promise<any>;
    abstract createAudioContext(): Promise<any>;
    /**
     * 背景音频
     */
    abstract stopBackgroundAudio(): Promise<any>;
    abstract seekBackgroundAudio(): Promise<any>;
    abstract playBackgroundAudio(): Promise<any>;
    abstract pauseBackgroundAudio(): Promise<any>;
    abstract onBackgroundAudioStop(): Promise<any>;
    abstract onBackgroundAudioPlay(): Promise<any>;
    abstract onBackgroundAudioPause(): Promise<any>;
    abstract getBackgroundAudioPlayerState(): Promise<any>;
    abstract getBackgroundAudioManager(): Promise<any>;

    /**
     * 实时音频
     */
    abstract createLivePusherContext(): Promise<any>;
    abstract createLivePlayerContext(): Promise<any>;

    /**
     * 录音
     */
    abstract stopRecord(): Promise<any>;
    abstract startRecord(): Promise<any>;
    abstract getRecorderManager(): Promise<any>;
    /**
     * 相机
     */
    abstract createCameraContext(): Promise<any>;

}

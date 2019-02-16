import { ImsSdk } from 'ims-sdk'
import { Injectable, Inject } from 'ims-common';
import { QueryString } from './query_string';
import { createBrowserHistory, History } from 'history'
@Injectable()
export class ImsSdkH5 extends ImsSdk {
    history: History = createBrowserHistory()

    constructor(@Inject(QueryString) public ps: QueryString) {
        super();
    }
    /**
     * 路由
     */
    async switchTab(url: string): Promise<any> {

    }
    async reLaunch(path: string): Promise<any> {
        const query = {
            ...this.ps.parse(location.search),
            ...{ r: path, t: new Date().getTime() }
        }
        const queryString = this.ps.stringify(query);
        const historyPaht = location.pathname + '?' + queryString + location.hash;
        location.href = historyPaht;
    }
    async redirectTo(path: string): Promise<any> {
        const query = {
            ...this.ps.parse(location.search),
            ...{ r: path, t: new Date().getTime() }
        }
        const queryString = this.ps.stringify(query);
        const historyPaht = location.pathname + '?' + queryString + location.hash;
        this.history.replace(historyPaht);
    }
    async navigateTo(path: string): Promise<any> {
        const query = {
            ...this.ps.parse(location.search),
            ...{ r: path, t: new Date().getTime() }
        }
        const queryString = this.ps.stringify(query);
        const historyPaht = location.pathname + '?' + queryString + location.hash;
        this.history.push(historyPaht);
    }
    async navigateBack(delta: number): Promise<any> {
        this.history.go(delta)
    }

    /**
     * 界面
     */

    /**
     * 交互
     */
    async showToast(): Promise<any> { }
    async showModal(): Promise<any> { }
    async showLoading(): Promise<any> { }
    async showActionSheet(): Promise<any> { }
    async hideToast(): Promise<any> { }
    async hideLoading(): Promise<any> { }

    /**
     * 导航栏
     */
    async showNavigationBarLoading(): Promise<any> { }
    async setNavigationBarTitle(): Promise<any> { }
    async setNavigationBarColor(): Promise<any> { }
    async hideNavigationBarLoading(): Promise<any> { }

    /**
     * 背景
     */
    async setBackgroundTextStyle(): Promise<any> { }
    async setBackgroundColor(): Promise<any> { }

    /**
     * tab bar
     */
    async showTabBarRedDot(): Promise<any> { }
    async showTabBar(): Promise<any> { }
    async setTabBarStyle(): Promise<any> { }
    async setTabBarItem(): Promise<any> { }
    async setTabBarBadge(): Promise<any> { }
    async removeTabBarBadge(): Promise<any> { }
    async hideTabBarRedDot(): Promise<any> { }
    async hideTabBar(): Promise<any> { }

    /**
     * 字体
     */
    async loadFontFace(): Promise<any> { }
    /**
     * 下拉刷新
     */
    async stopPullDownRefresh(): Promise<any> { }
    async startPullDownRefresh(): Promise<any> { }

    /**
     * 滚动
     */
    async pageScrollTo(): Promise<any> { }

    /**
     * 置顶
     */
    async setTopBarText(): Promise<any> { }


    /**
     * 自定义组件
     */
    async nextTick(): Promise<any> { }

    /**
     * 菜单
     */
    async getMenuButtonBoundingClientRect(): Promise<any> { }

    /**
     * 窗口
     */
    async onWindowResize(): Promise<any> { }
    async offWindowResize(): Promise<any> { }

    /**
     * 键盘
     */
    async onKeyboardHeightChange(): Promise<any> { }

    /**
     * 动画
     */
    createAnimation(): any { }

    /**
     * 网络
     */

    /**
     * 发起请求
     */
    request(): any { }

    /**
     * 下载
     */
    downloadFile(): any { }

    /**
     * 下载
     */
    uploadFile(): any { }

    /**
     * web sockets
     */
    async sendSocketMessage(): Promise<any> { }
    async onSocketOpen(): Promise<any> { }
    async onSocketMessage(): Promise<any> { }
    async onSocketError(): Promise<any> { }
    async onSocketClose(): Promise<any> { }
    async connectSocket(): Promise<any> { }
    async closeSocket(): Promise<any> { }

    /**
     * mdns
     */
    async stopLocalServiceDiscovery(): Promise<any> { }
    async startLocalServiceDiscovery(): Promise<any> { }
    async onLocalServiceResolveFail(): Promise<any> { }
    async onLocalServiceLost(): Promise<any> { }
    async onLocalServiceFound(): Promise<any> { }
    async onLocalServiceDiscoveryStop(): Promise<any> { }
    async offLocalServiceResolveFail(): Promise<any> { }
    async offLocalServiceLost(): Promise<any> { }
    async offLocalServiceFound(): Promise<any> { }
    async offLocalServiceDiscoveryStop(): Promise<any> { }

    /**
     * 数据缓存
     */
    async setStorageSync(): Promise<any> { }
    async setStorage(): Promise<any> { }
    async removeStorageSync(): Promise<any> { }
    async removeStorage(): Promise<any> { }
    async getStorageSync(): Promise<any> { }
    async getStorageInfoSync(): Promise<any> { }
    async getStorageInfo(): Promise<any> { }
    async getStorage(): Promise<any> { }
    async clearStorageSync(): Promise<any> { }
    async clearStorage(): Promise<any> { }


    /**
     * 媒体
     */

    /**
     * 地图
     */
    async createMapContext(): Promise<any> { }

    /**
     * 图片
     */
    async saveImageToPhotosAlbum(): Promise<any> { }
    async previewImage(): Promise<any> { }
    async getImageInfo(): Promise<any> { }
    async compressImage(): Promise<any> { }
    async chooseMessageFile(): Promise<any> { }
    async chooseImage(): Promise<any> { }

    /**
     * 视频
     */
    async saveVideoToPhotosAlbum(): Promise<any> { }
    async createVideoContext(): Promise<any> { }
    async chooseVideo(): Promise<any> { }

    /**
     * 音频
     */
    async stopVoice(): Promise<any> { }
    async setInnerAudioOption(): Promise<any> { }
    async playVoice(): Promise<any> { }
    async pauseVoice(): Promise<any> { }
    async getAvailableAudioSources(): Promise<any> { }
    async createInnerAudioContext(): Promise<any> { }
    async createAudioContext(): Promise<any> { }
    /**
     * 背景音频
     */
    async stopBackgroundAudio(): Promise<any> { }
    async seekBackgroundAudio(): Promise<any> { }
    async playBackgroundAudio(): Promise<any> { }
    async pauseBackgroundAudio(): Promise<any> { }
    async onBackgroundAudioStop(): Promise<any> { }
    async onBackgroundAudioPlay(): Promise<any> { }
    async onBackgroundAudioPause(): Promise<any> { }
    async getBackgroundAudioPlayerState(): Promise<any> { }
    async getBackgroundAudioManager(): Promise<any> { }

    /**
     * 实时音频
     */
    async createLivePusherContext(): Promise<any> { }
    async createLivePlayerContext(): Promise<any> { }

    /**
     * 录音
     */
    async stopRecord(): Promise<any> { }
    async startRecord(): Promise<any> { }
    async getRecorderManager(): Promise<any> { }
    /**
     * 相机
     */
    async createCameraContext(): Promise<any> { }
}

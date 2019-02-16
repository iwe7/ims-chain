"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_sdk_1 = require("ims-sdk");
const ims_common_1 = require("ims-common");
const query_string_1 = require("./query_string");
const history_1 = require("history");
let ImsSdkH5 = class ImsSdkH5 extends ims_sdk_1.ImsSdk {
    constructor(ps) {
        super();
        this.ps = ps;
        this.history = history_1.createBrowserHistory();
    }
    async switchTab(url) {
    }
    async reLaunch(path) {
        const query = {
            ...this.ps.parse(location.search),
            ...{ r: path, t: new Date().getTime() }
        };
        const queryString = this.ps.stringify(query);
        const historyPaht = location.pathname + '?' + queryString + location.hash;
        location.href = historyPaht;
    }
    async redirectTo(path) {
        const query = {
            ...this.ps.parse(location.search),
            ...{ r: path, t: new Date().getTime() }
        };
        const queryString = this.ps.stringify(query);
        const historyPaht = location.pathname + '?' + queryString + location.hash;
        this.history.replace(historyPaht);
    }
    async navigateTo(path) {
        const query = {
            ...this.ps.parse(location.search),
            ...{ r: path, t: new Date().getTime() }
        };
        const queryString = this.ps.stringify(query);
        const historyPaht = location.pathname + '?' + queryString + location.hash;
        this.history.push(historyPaht);
    }
    async navigateBack(delta) {
        this.history.go(delta);
    }
    async showToast() { }
    async showModal() { }
    async showLoading() { }
    async showActionSheet() { }
    async hideToast() { }
    async hideLoading() { }
    async showNavigationBarLoading() { }
    async setNavigationBarTitle() { }
    async setNavigationBarColor() { }
    async hideNavigationBarLoading() { }
    async setBackgroundTextStyle() { }
    async setBackgroundColor() { }
    async showTabBarRedDot() { }
    async showTabBar() { }
    async setTabBarStyle() { }
    async setTabBarItem() { }
    async setTabBarBadge() { }
    async removeTabBarBadge() { }
    async hideTabBarRedDot() { }
    async hideTabBar() { }
    async loadFontFace() { }
    async stopPullDownRefresh() { }
    async startPullDownRefresh() { }
    async pageScrollTo() { }
    async setTopBarText() { }
    async nextTick() { }
    async getMenuButtonBoundingClientRect() { }
    async onWindowResize() { }
    async offWindowResize() { }
    async onKeyboardHeightChange() { }
    createAnimation() { }
    request() { }
    downloadFile() { }
    uploadFile() { }
    async sendSocketMessage() { }
    async onSocketOpen() { }
    async onSocketMessage() { }
    async onSocketError() { }
    async onSocketClose() { }
    async connectSocket() { }
    async closeSocket() { }
    async stopLocalServiceDiscovery() { }
    async startLocalServiceDiscovery() { }
    async onLocalServiceResolveFail() { }
    async onLocalServiceLost() { }
    async onLocalServiceFound() { }
    async onLocalServiceDiscoveryStop() { }
    async offLocalServiceResolveFail() { }
    async offLocalServiceLost() { }
    async offLocalServiceFound() { }
    async offLocalServiceDiscoveryStop() { }
    async setStorageSync() { }
    async setStorage() { }
    async removeStorageSync() { }
    async removeStorage() { }
    async getStorageSync() { }
    async getStorageInfoSync() { }
    async getStorageInfo() { }
    async getStorage() { }
    async clearStorageSync() { }
    async clearStorage() { }
    async createMapContext() { }
    async saveImageToPhotosAlbum() { }
    async previewImage() { }
    async getImageInfo() { }
    async compressImage() { }
    async chooseMessageFile() { }
    async chooseImage() { }
    async saveVideoToPhotosAlbum() { }
    async createVideoContext() { }
    async chooseVideo() { }
    async stopVoice() { }
    async setInnerAudioOption() { }
    async playVoice() { }
    async pauseVoice() { }
    async getAvailableAudioSources() { }
    async createInnerAudioContext() { }
    async createAudioContext() { }
    async stopBackgroundAudio() { }
    async seekBackgroundAudio() { }
    async playBackgroundAudio() { }
    async pauseBackgroundAudio() { }
    async onBackgroundAudioStop() { }
    async onBackgroundAudioPlay() { }
    async onBackgroundAudioPause() { }
    async getBackgroundAudioPlayerState() { }
    async getBackgroundAudioManager() { }
    async createLivePusherContext() { }
    async createLivePlayerContext() { }
    async stopRecord() { }
    async startRecord() { }
    async getRecorderManager() { }
    async createCameraContext() { }
};
ImsSdkH5 = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__param(0, ims_common_1.Inject(query_string_1.QueryString)),
    tslib_1.__metadata("design:paramtypes", [query_string_1.QueryString])
], ImsSdkH5);
exports.ImsSdkH5 = ImsSdkH5;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_sdk_1 = require("ims-sdk");
const ims_common_1 = require("ims-common");
const history_1 = require("history");
const pathToRegexp = require('path-to-regexp');
const react_dom_1 = require("react-dom");
const React = require("react");
const ims_store_1 = require("ims-store");
const ipfsClient = require('ipfs-http-client');
class Page404 extends React.Component {
    render() {
        return React.createElement("div", null, "404");
    }
}
exports.Page404 = Page404;
class AppFooter extends React.Component {
    async click(e) {
        const sdk = await ims_common_1.Injector.get(ims_sdk_1.ImsSdk);
        sdk.redirectTo(e.pagePath);
    }
    render() {
        const api = ipfsClient('/ip4/127.0.0.1/tcp/5001');
        console.log(api);
        api.add([{
                path: 'index.html',
                content: api.types.Buffer.from('test')
            }]).then(res => {
            console.log(res);
        });
        const { list } = this.props;
        return React.createElement("div", { className: "footer", id: "footer" }, list && list.map((li, key) => React.createElement("div", { key: key, onClick: e => { this.click(li); }, className: "footer_item" }, li.text)));
    }
}
exports.AppFooter = AppFooter;
let ImsSdkH5 = class ImsSdkH5 extends ims_sdk_1.ImsSdk {
    constructor(ps, injector) {
        super();
        this.ps = ps;
        this.injector = injector;
        this.history = history_1.createBrowserHistory();
        this.pages = [];
        this.window = {};
        this.tabBar = {
            list: [{
                    pagePath: "/index",
                    text: '首页'
                }, {
                    pagePath: "/hot",
                    text: '精选'
                }, {
                    pagePath: "/gl",
                    text: '攻略'
                }, {
                    pagePath: "/home",
                    text: '我的'
                }]
        };
    }
    async ready() {
        const id = document.getElementById('app');
        const pages = await this.injector.get(ims_common_1.Page);
        this.renderTo(pages, this.injector, id);
        this.history.listen(async () => {
            await this.renderTo(pages, this.injector, id);
        });
        window.scrollTo(0, 1);
    }
    async renderTo(pages, injector, id) {
        const qs = await injector.get(ims_common_1.QueryString);
        const query = qs.parse(location.search);
        const path = query.r || '/';
        const page = pages.find(page => {
            const keys = [];
            const re = pathToRegexp(page.path, keys);
            return re.test(path);
        });
        this.setNavigationBarTitle(page && page.title);
        let Comp;
        if (page) {
            Comp = page.component;
        }
        else {
            Comp = Page404;
        }
        react_dom_1.render(React.createElement("div", { className: "root" },
            React.createElement(ims_store_1.ImsStore, null),
            React.createElement(AppFooter, Object.assign({}, this.tabBar))), id);
    }
    async switchTab(url) { }
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
    async setNavigationBarTitle(title) {
    }
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
    tslib_1.__param(0, ims_common_1.Inject()), tslib_1.__param(1, ims_common_1.Inject()),
    tslib_1.__metadata("design:paramtypes", [ims_common_1.QueryString, ims_common_1.Injector])
], ImsSdkH5);
exports.ImsSdkH5 = ImsSdkH5;

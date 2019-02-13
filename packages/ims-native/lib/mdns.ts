export abstract class ImsNativeMdns {
  /**
   * 停止搜索 mDNS 服务
   */
  abstract stopLocalServiceDiscovery(): any;
  /**
   * 开始搜索局域网下的 mDNS 服务。
   * 搜索的结果会通过 wx.onLocalService* 事件返回。
   */
  abstract startLocalServiceDiscovery(): any;
  /**
   * 监听 mDNS 服务解析失败的事件
   */
  abstract onLocalServiceResolveFail(): any;
  /**
   * 监听 mDNS 服务离开的事件
   */
  abstract onLocalServiceLost(): any;
  /**
   * 监听 mDNS 服务发现的事件
   */
  abstract onLocalServiceFound(): any;
  /**
   * 监听 mDNS 服务停止搜索的事件
   */
  abstract onLocalServiceDiscoveryStop(): any;
  /**
   * 取消监听 mDNS 服务解析失败的事件
   */
  abstract offLocalServiceResolveFail(): any;
  /**
   * 取消监听 mDNS 服务离开的事件
   */
  abstract offLocalServiceLost(): any;
  /**
   * 取消监听 mDNS 服务发现的事件
   */
  abstract offLocalServiceFound(): any;
  /**
   * 取消监听 mDNS 服务停止搜索的事件
   */
  abstract offLocalServiceDiscoveryStop(): any;
}

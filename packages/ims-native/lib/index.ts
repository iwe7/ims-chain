import { ImsNativeMdns } from "./mdns";
export abstract class ImsNative {
  readonly mdns: ImsNativeMdns;

  /**
   * 调用接口获取登录凭证（code）。
   * 通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。
   * 用户数据的加解密通讯需要依赖会话密钥完成。
   * 更多使用方法详见 小程序登录。
   */
  abstract login(): any;

  /**
   * 检查登录态是否过期。
   * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。
   * 用户越久未使用小程序，用户登录态越有可能失效。
   * 反之如果用户一直在使用小程序，则用户登录态一直保持有效。
   * 具体时效逻辑由微信维护，对开发者透明。
   * 开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。
   *
   * 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。
   * 调用成功说明当前 session_key 未过期，
   * 调用失败说明 session_key 已过期。
   * 更多使用方法详见 小程序登录。
   */
  abstract checkSession(): any;
  /**
   * 打开另一个小程序
   */
  abstract navigateToMiniProgram(): any;
  /**
   * 返回到上一个小程序。
   * 只有在当前小程序是被其他小程序打开时可以调用成功
   */
  abstract navigateBackMiniProgram(): any;

  /**
   * 获取当前帐号信息
   */
  abstract getAccountInfoSync(): any;

  /**
   * 获取用户信息。
   */
  abstract getUserInfo(): any;

  /**
   * 用户支付完成后，获取该用户的 UnionId，无需用户授权。
   * 本接口支持第三方平台代理查询。
   */
  abstract getPaidUnionId(): any;

  /**
   * 自定义业务数据监控上报接口。
   */
  abstract reportMonitor(): any;
}

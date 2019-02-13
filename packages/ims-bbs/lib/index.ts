import { PlatformType } from "./types";

export class ImsBbs {
  /**
   * 创建平台
   */
  static createPlatform(type: PlatformType) {
    switch (type) {
      case PlatformType.ali:
      case PlatformType.android:
      case PlatformType.baidu:
      case PlatformType.electron:
      case PlatformType.h5:
      case PlatformType.ios:
      case PlatformType.pc:
      case PlatformType.wechat:
      case PlatformType.wxapp:
      default:
        break;
    }
  }
  /**
   * 安装
   */
  static install() {}

  /**
   * 删除
   */
  static uninstall() {}

  /**
   * 更新
   */
  static upgrade() {}
}

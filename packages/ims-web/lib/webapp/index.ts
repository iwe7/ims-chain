import { ImsWebappModuleLinkUniacid } from "./module-link-uniacid";
import { ImsWebappBindDomain } from "./bind-domain";
import { ImsWebappManage } from "./manage";

export abstract class ImsWebapp {
  /**
   * 域名访问设置
   */
  readonly bindDomain: ImsWebappBindDomain;
  /**
   * pc列表
   */
  readonly manage: ImsWebappManage;
  /**
   * PC - 数据同步
   */
  readonly moduleLinkUniacid: ImsWebappModuleLinkUniacid;
  /**
   * 伪静态
   */
  abstract rewrite(): Promise<any>;
  /**
   * 切换pc
   */
  abstract home(): Promise<any>;
}

/**
 * 域名访问设置
 */
export abstract class ImsWebappBindDomain {
  abstract bindDomain(): Promise<any>;
  abstract delete(): Promise<any>;
  abstract defaultModule(): Promise<any>;
}

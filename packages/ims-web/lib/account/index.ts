export abstract class ImsAccount {
  /**
   * auth
   */
  readonly auth: ImsAccountAuth;
  /**
   * display
   */
  readonly display: ImsAccountDisplay;
  /**
   * manage
   */
  readonly manage: ImsAccountManage;
  /**
   * postUser
   */
  readonly postUser: ImsAccountPostUser;
  /**
   * post
   */
  readonly post: ImsAccountPost;
  /**
   * recycle
   */
  readonly recycle: ImsAccountRecycle;
  /**
   * postStep
   */
  abstract postStep(): Promise<any>;
  /**
   * welcome
   */
  abstract welcome(): Promise<any>;
}

export abstract class ImsAccountRecycle {
  abstract display(): Promise<any>;
  abstract recover(): Promise<any>;
  abstract delete(): Promise<any>;
}

export abstract class ImsAccountPost {
  abstract base(): Promise<any>;
  abstract sms(): Promise<any>;
  abstract modules_tpl(): Promise<any>;
}

export abstract class ImsAccountPostUser {
  abstract delete(): Promise<any>;
  abstract edit(): Promise<any>;
  abstract set_permission(): Promise<any>;
  abstract set_manager(): Promise<any>;
  abstract module(): Promise<any>;
}

export abstract class ImsAccountManage {
  abstract display(): Promise<any>;
  abstract delete(): Promise<any>;
}

export abstract class ImsAccountDisplay {
  abstract rank(): Promise<any>;
  abstract display(): Promise<any>;
  abstract switch(): Promise<any>;
  abstract platform(): Promise<any>;
}

export abstract class ImsAccountAuth {
  abstract ticket(): Promise<any>;
  abstract forward(): Promise<any>;
  abstract test(): Promise<any>;
  abstract confirm(): Promise<any>;
}

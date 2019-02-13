export abstract class ImsCloud {
  /**
   * 云服务诊断
   */
  readonly diagnose: ImsCloudDiagnose;

  readonly dock: ImsCloudDock;

  readonly process: ImsCloudProcess;

  /**
   * 跳转
   */
  readonly redirect: ImsCloudRedirect;

  /**
   * sms sign
   */
  readonly smsSign: ImsCloudSmsSign;

  /**
   * 更新
   */
  readonly upgrade: ImsCloudUpgrade;

  /**
   * 登录
   */
  abstract login(): Promise<any>;
}

export abstract class ImsCloudUpgrade {
  abstract upgrade(): Promise<any>;
  abstract get_upgrade_info(): Promise<any>;
}

export abstract class ImsCloudSmsSign {
  abstract display(): Promise<any>;
  abstract save_sms_sign(): Promise<any>;
}

export abstract class ImsCloudRedirect {
  abstract profile(): Promise<any>;
  abstract callback(): Promise<any>;
  abstract appstore(): Promise<any>;
  abstract buybranch(): Promise<any>;
  abstract sms(): Promise<any>;
}

export abstract class ImsCloudProcess {
  abstract files(): Promise<any>;
  abstract schemas(): Promise<any>;
  abstract scripts(): Promise<any>;
}

export abstract class ImsCloudDiagnose {
  abstract display(): Promise<any>;
  abstract testapi(): Promise<any>;
}

export abstract class ImsCloudDock {
  abstract auth(): Promise<any>;
  abstract build(): Promise<any>;
  abstract init(): Promise<any>;
  abstract schema(): Promise<any>;
  abstract download(): Promise<any>;
  abstract moduleQuery(): Promise<any>;
  abstract moduleBought(): Promise<any>;
  abstract moduleInfo(): Promise<any>;
  abstract moduleBuild(): Promise<any>;
  abstract moduleSettingCloud(): Promise<any>;
  abstract themeQuery(): Promise<any>;
  abstract themeInfo(): Promise<any>;
  abstract themeBuild(): Promise<any>;
  abstract applicationBuild(): Promise<any>;
  abstract smsSend(): Promise<any>;
  abstract smsInfo(): Promise<any>;
  abstract apiOauth(): Promise<any>;
}

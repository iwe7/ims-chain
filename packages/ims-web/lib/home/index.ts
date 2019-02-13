export class ImsHome {
  readonly welcome: ImsHomeWelcome;
}

export abstract class ImsHomeWelcome {
  abstract platform(): Promise<any>;
  abstract system(): Promise<any>;
  abstract ext(): Promise<any>;
  abstract get_fans_kpi(): Promise<any>;
  abstract get_last_modules(): Promise<any>;
  abstract get_system_upgrade(): Promise<any>;
  abstract get_upgrade_modules(): Promise<any>;
  abstract get_module_statistics(): Promise<any>;
  abstract get_ads(): Promise<any>;
  abstract get_not_installed_modules(): Promise<any>;
  abstract system_home(): Promise<any>;
  abstract set_top(): Promise<any>;
  abstract add_welcome(): Promise<any>;
  abstract ignore_update_module(): Promise<any>;
}

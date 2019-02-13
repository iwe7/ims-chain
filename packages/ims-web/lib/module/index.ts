export abstract class ImsModule {
  /**
   * 默认入口
   */
  abstract defaultEntry(): Promise<any>;
  /**
   * 应用列表
   */
  readonly display: ImsModuleDisplay;
  /**
   * 编辑应用套餐
   */
  readonly group: ImsModuleGroup;
  /**
   * 设置模块启用停用，并显示模块到快捷菜单中
   */
  readonly manageAccount: ImsModuleManageAccount;
  /**
   * 模块管理
   */
  readonly manageSystem: ImsModuleManageSystem;

  /**
   * 设置模块权限
   */
  readonly permission: ImsModulePermission;
}

export abstract class ImsModuleDisplay {
  abstract switch(): Promise<any>;
  abstract display(): Promise<any>;
  abstract getall_last_switch(): Promise<any>;
  abstract have_permission_uniacids(): Promise<any>;
  abstract accounts_dropdown_menu(): Promise<any>;
  abstract rank(): Promise<any>;
}
export abstract class ImsModuleGroup {
  abstract display(): Promise<any>;
  abstract delete(): Promise<any>;
  abstract post(): Promise<any>;
  abstract save(): Promise<any>;
}
export abstract class ImsModuleManageAccount {
  abstract display(): Promise<any>;
  abstract setting(): Promise<any>;
  abstract shortcut(): Promise<any>;
  abstract enable(): Promise<any>;
  abstract check_status(): Promise<any>;
}

export abstract class ImsModulePermission {
  abstract display(): Promise<any>;
  abstract post(): Promise<any>;
  abstract delete(): Promise<any>;
}
/**
 * 模块管理
 */
export abstract class ImsModuleManageSystem {
  abstract subscribe(): Promise<any>;
  abstract check_subscribe(): Promise<any>;
  abstract check_upgrade(): Promise<any>;
  abstract get_upgrade_info(): Promise<any>;
  abstract upgrade(): Promise<any>;
  abstract install(): Promise<any>;
  abstract installed(): Promise<any>;
  abstract not_installed(): Promise<any>;
  abstract uninstall(): Promise<any>;
  abstract save_module_info(): Promise<any>;
  abstract module_detail(): Promise<any>;
  abstract founder_update_modules(): Promise<any>;
  abstract recycle(): Promise<any>;
  abstract recycle_post(): Promise<any>;
}

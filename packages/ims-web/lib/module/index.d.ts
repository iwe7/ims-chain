export declare abstract class ImsModule {
    abstract defaultEntry(): Promise<any>;
    readonly display: ImsModuleDisplay;
    readonly group: ImsModuleGroup;
    readonly manageAccount: ImsModuleManageAccount;
    readonly manageSystem: ImsModuleManageSystem;
    readonly permission: ImsModulePermission;
}
export declare abstract class ImsModuleDisplay {
    abstract switch(): Promise<any>;
    abstract display(): Promise<any>;
    abstract getall_last_switch(): Promise<any>;
    abstract have_permission_uniacids(): Promise<any>;
    abstract accounts_dropdown_menu(): Promise<any>;
    abstract rank(): Promise<any>;
}
export declare abstract class ImsModuleGroup {
    abstract display(): Promise<any>;
    abstract delete(): Promise<any>;
    abstract post(): Promise<any>;
    abstract save(): Promise<any>;
}
export declare abstract class ImsModuleManageAccount {
    abstract display(): Promise<any>;
    abstract setting(): Promise<any>;
    abstract shortcut(): Promise<any>;
    abstract enable(): Promise<any>;
    abstract check_status(): Promise<any>;
}
export declare abstract class ImsModulePermission {
    abstract display(): Promise<any>;
    abstract post(): Promise<any>;
    abstract delete(): Promise<any>;
}
export declare abstract class ImsModuleManageSystem {
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
//# sourceMappingURL=index.d.ts.map
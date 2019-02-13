import { ImsUser, ImsUserThirdBind, ImsUserSmsSign, ImsUserProfile, ImsUserRegister, ImsUserEdit, ImsUserExpire, ImsUserFields, ImsUserFindPassword, ImsUserGroup } from "ims-web";
export declare class ImsUserProfileImpl extends ImsUserProfile {
    base(): Promise<any>;
    post(): Promise<any>;
    bind(): Promise<any>;
    validateMobile(): Promise<any>;
    bindMobile(): Promise<any>;
    unbind(): Promise<any>;
}
export declare class ImsUserImpl extends ImsUser {
    create(): Promise<any>;
    login(username: string, password: string): Promise<any>;
    logout(): Promise<any>;
    registerset(): Promise<any>;
    readonly thirdBind: ImsUserThirdBind;
    readonly smsSign: ImsUserSmsSign;
    readonly profile: ImsUserProfile;
    readonly register: ImsUserRegister;
    readonly edit: ImsUserEdit;
    readonly Expire: ImsUserExpire;
    readonly fields: ImsUserFields;
    readonly findPassword: ImsUserFindPassword;
    readonly group: ImsUserGroup;
}
//# sourceMappingURL=index.d.ts.map
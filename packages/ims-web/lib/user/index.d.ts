import { ImsUserEdit } from "./edit";
import { ImsUserExpire } from "./expire";
import { ImsUserFields } from "./fields";
import { ImsUserFindPassword } from "./findPassword";
import { ImsUserGroup } from "./group";
import { ImsUserProfile } from "./profile";
import { ImsUserRegister } from "./register";
import { ImsUserSmsSign } from "./smsSign";
import { ImsUserThirdBind } from "./thirdBind";
export { ImsUserEdit, ImsUserExpire, ImsUserFields, ImsUserFindPassword, ImsUserGroup, ImsUserProfile, ImsUserRegister, ImsUserSmsSign, ImsUserThirdBind };
export declare abstract class ImsUser {
    abstract create(): Promise<any>;
    abstract login(username: string, password: string): Promise<any>;
    abstract logout(): Promise<any>;
    abstract registerset(): Promise<any>;
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
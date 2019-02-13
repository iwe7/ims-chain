import { ImsUserEdit } from "./edit";
import { ImsUserExpire } from "./expire";
import { ImsUserFields } from "./fields";
import { ImsUserFindPassword } from "./findPassword";
import { ImsUserGroup } from "./group";
import { ImsUserProfile } from "./profile";
import { ImsUserRegister } from "./register";
import { ImsUserSmsSign } from "./smsSign";
import { ImsUserThirdBind } from "./thirdBind";

export {
  ImsUserEdit,
  ImsUserExpire,
  ImsUserFields,
  ImsUserFindPassword,
  ImsUserGroup,
  ImsUserProfile,
  ImsUserRegister,
  ImsUserSmsSign,
  ImsUserThirdBind
};

export abstract class ImsUser {
  /**
   * 添加用户
   */
  abstract create(): Promise<any>;

  /**
   * 登录
   */
  abstract login(username: string, password: string): Promise<any>;

  /**
   * 退出登录
   */
  abstract logout(): Promise<any>;

  /**
   * 用户注册设置
   */
  abstract registerset(): Promise<any>;

  /**
   * 绑定用户信息
   */
  readonly thirdBind: ImsUserThirdBind;

  /**
   * 找回密码短信签名设置
   */
  readonly smsSign: ImsUserSmsSign;

  /**
   * 我的账户
   */
  readonly profile: ImsUserProfile;

  /**
   * 注册
   */
  readonly register: ImsUserRegister;

  /**
   * 编辑用户
   */
  readonly edit: ImsUserEdit;

  /**
   * 找回密码短信签名设置
   */
  readonly Expire: ImsUserExpire;

  /**
   * 资料字段管理
   */
  readonly fields: ImsUserFields;

  /**
   * 找回密码
   */
  readonly findPassword: ImsUserFindPassword;

  /**
   * 用户组管理
   */
  readonly group: ImsUserGroup;
}

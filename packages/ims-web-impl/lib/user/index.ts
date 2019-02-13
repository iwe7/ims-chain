import {
  ImsUser,
  ImsUserThirdBind,
  ImsUserSmsSign,
  ImsUserProfile,
  ImsUserRegister,
  ImsUserEdit,
  ImsUserExpire,
  ImsUserFields,
  ImsUserFindPassword,
  ImsUserGroup
} from "ims-web";
import { Injectable } from "ims-common";

export class ImsUserProfileImpl extends ImsUserProfile {
  async base(): Promise<any> {
    return {
      method: "base"
    };
  }
  async post(): Promise<any> {
    return {
      method: "post"
    };
  }
  async bind(): Promise<any> {
    return {
      method: "bind"
    };
  }
  async validateMobile(): Promise<any> {
    return {
      method: "validateMobile"
    };
  }
  async bindMobile(): Promise<any> {
    return {
      method: "bindMobile"
    };
  }
  async unbind(): Promise<any> {
    return {
      method: "unbind"
    };
  }
}

@Injectable()
export class ImsUserImpl extends ImsUser {
  /**
   * 添加用户
   */
  async create(): Promise<any> {
    return {
      method: "create"
    };
  }

  /**
   * 登录
   */
  async login(username: string, password: string): Promise<any> {
    return {
      username,
      password
    };
  }

  /**
   * 退出登录
   */
  async logout(): Promise<any> {
    return {
      method: "logout"
    };
  }

  /**
   * 用户注册设置
   */
  async registerset(): Promise<any> {
    return {
      method: "registerset"
    };
  }

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
  readonly profile: ImsUserProfile = new ImsUserProfileImpl();

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

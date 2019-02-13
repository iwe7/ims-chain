import { ImsAccount, ImsAccountAction } from "./base";
export class ImsAccountWechat extends ImsAccount {
  constructor(public appid: string, public appsecret: string) {
    super();
  }


  apply<T = any>(action: ImsAccountAction<T>) {}
}

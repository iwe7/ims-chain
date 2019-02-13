import { Component, createElement } from "react";
import "./index.scss";
import { Injector, InjectionToken } from "ims-core";
import { ImsUser } from "ims-web";
import { fromEvent } from "rxjs";
import { Link } from "react-router-dom";

export class ImsUserLogin extends Component<any, any> {
  get user(): Promise<ImsUser> {
    return Injector.get<ImsUser>(InjectionToken.fromType(ImsUser));
  }

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    fromEvent(this.refs.username as any, "change").subscribe((res: any) => {
      let username = res.target.value;
      this.setState({ username });
    });

    fromEvent(this.refs.password as any, "change").subscribe((res: any) => {
      let password = res.target.value;
      this.setState({ password });
    });
  }

  async login() {
    const user = await this.user;
    await user.login(this.state.username, this.state.password);
  }
  render() {
    return (
      <div className="ims-user-login">
        <div className="ims-user-login-wrapper">
          <div className="ims-user-login-adv">
            <div className="ims-user-login-adv-title">智能链享，共享互通</div>
            <ul>
              <li> 海量应用，千款插件，自由搭配 </li>
              <li> 数据360度加密，保证隐私安全 </li>
              <li> 统一会员、共识机制、智能合约 </li>
              <li> 去中心化、公开透明，联合运营 </li>
            </ul>
          </div>
          <div className="ims-user-login-box">
            <div className="ims-user-login-form">
              <div className="ims-user-login-header">
                <div className="ims-user-login-header-title">密码登录</div>
              </div>
              <div className="ims-user-login-username">
                <input
                  type="text"
                  ref="username"
                  placeholder="邮箱/会员名/8位ID"
                />
              </div>
              <div className="ims-user-login-password">
                <input
                  type="password"
                  ref="password"
                  placeholder="请输入登录密码"
                />
              </div>
              <div className="ims-user-login-btn">
                <button onClick={() => this.login()}>登录</button>
              </div>
              <div className="ims-user-login-links">
                <Link to={"/user/findPassword"}>忘记密码</Link>
                <Link to={"/user/findUsername"}>忘记会员名</Link>
                <Link to={"/user/register"}>免费注册</Link>
              </div>
              <div className="ims-user-login-third">
                <div>其他方式登录</div>
                <div className="content">
                  <a href="javascript:;">游客登录</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

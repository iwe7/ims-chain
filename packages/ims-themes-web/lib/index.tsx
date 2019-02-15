import { bootstrapModule, Module, AppInitialization } from "ims-common";
import { Injector, InjectionToken } from "ims-core";
import { render } from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { ImsCommonContent } from "./common/index";
import { ImsUserLogin, ImsUserRegister, ImsUserFindPassword } from "./user";
import * as home from "./home";
import * as docs from "./docs";
import * as store from "./store";
import * as ipfs from "./ipfs";

import { ImsUser, ImsIpfs } from "ims-web";
import { ImsCloudClientModule } from "ims-cloud-client";
import { Routes } from "ims-cloud";
import { Route, Switch, HashRouter } from "react-router-dom";
import React = require("react");

@Module({
  providers: [
    {
      provide: Routes,
      useFactory: () => [
        InjectionToken.fromType(ImsUser),
        InjectionToken.fromType(ImsIpfs)
      ]
    },
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        render(
          <HashRouter>
            <div className="app">
              <Switch>
                <ImsCommonContent>
                  <Route path="/" exact component={home.ImsHomeWelcome} />
                  <Route
                    path="/home/install"
                    exact
                    component={home.ImsHomeInstall}
                  />
                  <Route
                    path="/store/home"
                    exact
                    component={store.ImsStoreHome}
                  />
                  <Route path="/docs/home" exact component={docs.ImsDocsHome} />
                  <Route path="/ipfs/home" exact component={ipfs.ImsIpfsHome} />
                  <Route path="/user/login" component={ImsUserLogin} />
                  <Route path="/user/register" component={ImsUserRegister} />
                  <Route
                    path="/user/findPassword"
                    component={ImsUserFindPassword}
                  />
                </ImsCommonContent>
              </Switch>
            </div>
          </HashRouter>,
          document.getElementById("app")
        );
      }
    }
  ],
  imports: [ImsCloudClientModule]
})
export class ImsThemesWeb {}
bootstrapModule(ImsThemesWeb);

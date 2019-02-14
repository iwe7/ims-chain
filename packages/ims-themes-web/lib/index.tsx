import { bootstrapModule, Module, AppInitialization } from "ims-common";
import { Injector, InjectionToken } from "ims-core";
import { createElement } from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import { ImsCommonContent } from "./common/index";
import { ImsUserLogin, ImsUserRegister, ImsUserFindPassword } from "./user";
import * as home from "./home";
import { ImsUser } from "ims-web";
import { ImsCloudClientModule } from "ims-cloud-client";
import { Routes } from "ims-cloud";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React= require("react");

@Module({
  providers: [
    {
      provide: Routes,
      useFactory: () => [InjectionToken.fromType(ImsUser)]
    },
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        render(
          <BrowserRouter>
            <div className="app">
              <Switch>
                <ImsCommonContent>
                  <Route path="/" exact component={home.ImsHomeWelcome} />
                  <Route path="/user/login" component={ImsUserLogin} />
                  <Route path="/user/register" component={ImsUserRegister} />
                  <Route
                    path="/user/findPassword"
                    component={ImsUserFindPassword}
                  />
                </ImsCommonContent>
              </Switch>
            </div>
          </BrowserRouter>,
          document.getElementById("app")
        );
      }
    }
  ],
  imports: [ImsCloudClientModule]
})
export class ImsThemesWeb {}
bootstrapModule(ImsThemesWeb);

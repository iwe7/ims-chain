import { bootstrapModule, Module, AppInitialization } from "ims-common";
import { Injector, InjectionToken } from "ims-core";
import { createElement } from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import {
  ImsCommonTopBar,
  ImsCommonFooter,
  ImsCommonContent
} from "./common/index";
import { ImsUserLogin } from "./user";
import { ImsUser } from "ims-web";
import { ImsCloudClientModule } from "ims-cloud-client";
import { Routes } from "ims-cloud";

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
          <div className="app">
            <ImsCommonTopBar />
            <ImsCommonContent>
              <ImsUserLogin />
            </ImsCommonContent>
            <ImsCommonFooter />
          </div>,
          document.getElementById("app")
        );
      }
    }
  ],
  imports: [ImsCloudClientModule]
})
export class ImsThemesWeb {}
bootstrapModule(ImsThemesWeb);

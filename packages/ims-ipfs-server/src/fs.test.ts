import { bootstrapModule } from "ims-common";
import { InjectionToken } from "ims-core";
import { ImsIpfsServerModule } from "./index";
import { ImsFsServer } from "./fs";
try {
  bootstrapModule(ImsIpfsServerModule)
    .then(async res => {
      let fss = await res.injector.get<ImsFsServer>(
        InjectionToken.fromType<ImsFsServer>(ImsFsServer)
      );
    })
    .catch(e => {
      debugger;
      throw e;
    });
} catch (e) {
  debugger;
}

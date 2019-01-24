import { bootstrapModule } from "ims-common";
import { InjectionToken } from "ims-core";
import { ImsFsServerModule } from "./index";
import { ImsFsServer } from "./fs";
bootstrapModule(ImsFsServerModule).then(async res => {
  let fs = await res.injector.get(
    InjectionToken.fromType<ImsFsServer>(ImsFsServer)
  );
});

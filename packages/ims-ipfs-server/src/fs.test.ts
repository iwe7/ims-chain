import { bootstrapModule } from "ims-common";
import { InjectionToken } from "ims-core";
import { ImsFsServerModule } from "./index";
import { ImsFsServer } from "./fs";

bootstrapModule(ImsFsServerModule).then(async res => {
  let fss = await res.injector.get<ImsFsServer>(
    InjectionToken.fromType<ImsFsServer>(ImsFsServer)
  );
});

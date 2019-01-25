import { bootstrapModule } from "ims-common";
import { InjectionToken } from "ims-core";
import { ImsFsServerModule } from "./index";
import { ImsFsServer } from "./fs";
bootstrapModule(ImsFsServerModule).then(async res => {
  let fs = await res.injector.get(
    InjectionToken.fromType<ImsFsServer>(ImsFsServer)
  );
  let addRes = await fs.add([
    {
      path: "1.txt",
      content: "33344"
    }
  ]);
  let catRes = await fs.cat(addRes[0].hash);
  console.log(catRes);
  debugger;
});

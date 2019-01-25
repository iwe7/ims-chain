import { bootstrapModule } from "ims-common";
import { InjectionToken } from "ims-core";
import { ImsFsServerModule } from "./index";
import { ImsFsServer } from "./fs";
import * as fss from "fs";
import * as path from "path";

bootstrapModule(ImsFsServerModule).then(async res => {
  let fs = await res.injector.get(
    InjectionToken.fromType<ImsFsServer>(ImsFsServer)
  );
  let addRes = await fs.add([
    {
      path: "index.html",
      content: fss.readFileSync(path.join(__dirname, "index.html"))
    }
  ]);
  let catRes = await fs.cat(addRes[0].hash);
  console.log(catRes);
  debugger;
});

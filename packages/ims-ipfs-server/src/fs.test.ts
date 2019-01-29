import { bootstrapModule } from "ims-common";
import { ImsIpfsServerModule } from "./index";
try {
  bootstrapModule(ImsIpfsServerModule);
} catch (e) {
  debugger;
}

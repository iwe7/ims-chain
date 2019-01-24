import { bootstrapModule } from "ims-common";
import { ImsIpfsClientModule } from "./index";
import { IpfsApi } from "ims-ipfs";

bootstrapModule(ImsIpfsClientModule).then(async res => {
  let injector = res.injector;
  let ipfs = await injector.get(IpfsApi);
  let result = await ipfs.add([
    {
      path: "1.txt",
      content: "333"
    }
  ]);
  debugger;
});

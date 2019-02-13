import { MultiaddrModule, MultiaddrFactory } from ".";
import { bootstrapModule } from "ims-common";

bootstrapModule(MultiaddrModule).then(async res => {
  let factory = await res.injector.get(MultiaddrFactory);
  let addr = factory("/ip4/127.0.0.1/tcp/123");
  debugger;
});

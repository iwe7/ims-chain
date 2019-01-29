import { ImsRepoModule } from "./index";
import { bootstrapModule } from "ims-common";
import { ImsRepos, ImsBlockService } from "./token";
bootstrapModule(ImsRepoModule).then(async res => {
  let repos = await res.injector.get(ImsBlockService);
  debugger;
});

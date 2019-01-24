import { Type } from "ims-core";
import { ModuleFactory } from "./module";
import { AppInitialization } from "./tokens";

export async function bootstrapModule(type: Type<any>) {
  let moduleRef = await ModuleFactory.create(type);
  let appInits = await moduleRef.injector.get(AppInitialization);
  if (Array.isArray(appInits)) {
    for (let init of appInits) {
      if (Array.isArray(init)) {
        throw new Error(`app initialization 不支持多级嵌套`);
      } else {
        await init(moduleRef.injector);
      }
    }
  }
  return moduleRef;
}

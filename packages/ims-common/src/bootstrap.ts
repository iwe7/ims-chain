import { Type, StaticProvider } from "ims-core";
import { ModuleFactory, ModuleRef } from "./module";
import { AppInitialization } from "./tokens";
export async function bootstrapInjector(
  type: Type<any>,
  providers: StaticProvider[] = []
) {
  let moduleRef = await ModuleFactory.create(type);
  let obs = [];
  for (let provider of providers) {
    obs.push(moduleRef.injector.handlerStaticProvider(provider));
  }
  await Promise.all(obs);
  return moduleRef;
}
export async function bootstrapModule(
  type: Type<any>,
  providers: StaticProvider[] = []
): Promise<ModuleRef<any>> {
  const moduleRef = await bootstrapInjector(type, providers);
  let appInits = await moduleRef.injector.get(AppInitialization);
  if (Array.isArray(appInits)) {
    for (let init of appInits) {
      if (Array.isArray(init)) {
        throw new Error(`app initialization 不支持多级嵌套`);
      } else {
        if (typeof init === "function") {
          await init(moduleRef.injector);
        }
      }
    }
  }
  return moduleRef;
}

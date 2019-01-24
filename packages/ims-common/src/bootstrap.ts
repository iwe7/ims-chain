import { Type } from "ims-core";
import { ModuleFactory } from "./module";

export async function bootstrapModule(type: Type<any>) {
  return await ModuleFactory.create(type);
}

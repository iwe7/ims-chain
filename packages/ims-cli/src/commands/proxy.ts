import { Commands, Commander } from "../tokens";
import { Injector } from "ims-core";
import { bootstrap } from "ims-proxy";
export const proxy = {
  provide: Commands,
  useFactory: async (injector: Injector) => {
    let commander = await injector.get(Commander);
    return commander.command("proxy").action(() => {
      console.log("proxy");
      bootstrap();
    });
  }
};

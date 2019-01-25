import { Injector } from "./index";
import { InjectionToken } from "./injection_token";

async function bootstraaap() {
  let injector = await Injector.create([
    {
      provide: InjectionToken.fromString("demo"),
      useFactory: injector => "demo1"
    }
  ]);
  let ij = await Injector.create(
    [
      {
        provide: InjectionToken.fromString("demo"),
        useFactory: injector => "demo"
      }
    ],
    injector
  );
  let demo = await ij.get(InjectionToken.fromString("demo"));
  debugger;
}
bootstraaap();

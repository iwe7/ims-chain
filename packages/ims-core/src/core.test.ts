import { Injector } from "./index";
import { InjectionToken } from "./injection_token";

async function bootstraaap() {
  let injector = await Injector.create([
    {
      provide: InjectionToken.fromString("demo"),
      useFactory: injector => "demo1",
      deps: [],
      multi: true
    }
  ]);
  let ij = await Injector.create(
    [
      {
        provide: InjectionToken.fromString("demo"),
        useFactory: injector => "demo",
        deps: [],
        multi: true
      }
    ],
    injector
  );
  let demo = await ij.get(InjectionToken.fromString("demo"));
  debugger;
}
bootstraaap();

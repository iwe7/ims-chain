import { Module } from "./module";
import { bootstrapModule } from "./bootstrap";
import { Injectable } from "./injectable";

import { InjectionToken, Injector } from "ims-core";
import { AppInitialization } from "./tokens";

@Injectable()
export class InjectableTest {}

@Module({
  providers: [
    {
      provide: InjectionToken.fromString("test"),
      useFactory: async () => {
        return "test";
      }
    }
  ]
})
export class TestModule {}

@Module({
  providers: [
    {
      provide: InjectionToken.fromString("test2"),
      useFactory: async () => {
        return "test";
      }
    },
    {
      provide: AppInitialization,
      useFactory: async (injector: Injector) => {
        console.log("app initialization");
        return "trest";
      }
    }
  ],
  imports: [TestModule]
})
export class Test2Module {}

bootstrapModule(Test2Module).then(async res => {
  let test = await res.injector.get(InjectionToken.fromType(InjectableTest));
  console.log(test);
  debugger;
});

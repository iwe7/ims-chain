import { bootstrapModule, Injectable, Module } from "ims-common";
import { InjectionToken } from "ims-core";
import { Routes, Fetch } from "ims-cloud";

@Injectable()
export class TestIndex {
  getIndex() {
    return "get index";
  }
}

@Module({
  providers: [
    {
      provide: Fetch,
      useFactory: () => require("node-fetch")
    },
    {
      provide: Routes,
      useFactory: () => InjectionToken.fromType(TestIndex)
    }
  ]
})
export class TestModule {}

bootstrapModule(TestModule).then(async res => {
  let test = await res.injector.get(InjectionToken.fromType(TestIndex));
  let result = await test.getIndex();
  debugger;
});

import { bootstrapModule, Module, Injectable } from "ims-common";
import { ImsCloudServerModule } from "./index";
import { Routes } from "ims-cloud";
import { InjectionToken } from "ims-core";

@Injectable()
export class TestIndex {
  getIndex() {
    return "get index";
  }
}

@Module({
  providers: [
    {
      provide: Routes,
      useFactory: () => InjectionToken.fromType(TestIndex)
    }
  ],
  imports: [ImsCloudServerModule]
})
export class TestCloudModule {}
bootstrapModule(TestCloudModule);

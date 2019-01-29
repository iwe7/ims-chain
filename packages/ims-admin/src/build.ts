import { Module, bootstrapModule } from "ims-common";
import { ImsWebpackModule, WebpackMain } from "ims-webpack";
import path = require("path");
@Module({
  imports: [ImsWebpackModule],
  providers: [
    {
      provide: WebpackMain,
      useFactory: () => [path.join(__dirname, "index.tsx")]
    }
  ]
})
export class ImsAdminBuildModule {}
bootstrapModule(ImsAdminBuildModule);

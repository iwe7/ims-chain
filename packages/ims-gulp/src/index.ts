import { Injector } from "ims-core";
import { IpfsApi } from "ims-ipfs";
import { bootstrapModule, Module, AppInitialization } from "ims-common";

const sink = require("lead");
import gulp = require("gulp");
const through = require("through2");

export async function dest(injector: Injector) {
  let ipfs = await injector.get(IpfsApi);
  debugger;
  return sink(
    through((chunk: Buffer, enc: any, cb: any) => {
      console.log({ chunk, enc, cb });
    })
  );
}
import path = require("path");
import { ImsIpfsClientModule } from "packages/ims-ipfs-client/src";

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: () => {
        return async (injector: Injector) => {
          let res = await dest(injector);
          gulp.src([path.join(__dirname, "../../")]).pipe(res);
          debugger;
          return;
        };
      }
    }
  ],
  imports: [ImsIpfsClientModule]
})
export class ImsGulpModule {}
bootstrapModule(ImsGulpModule).then(res => {
  debugger;
});

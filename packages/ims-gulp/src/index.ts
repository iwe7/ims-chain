import { Injector } from "ims-core";
import { IpfsApi } from "ims-ipfs";
import { bootstrapModule, Module, AppInitialization } from "ims-common";
import through = require("through2");
import path = require("path");
import { ImsIpfsClientModule } from "ims-ipfs-client";
import { GulpToken } from "./token";
import { WriteStream } from "fs";
import gulp = require("gulp");

let files: any[] = [];
async function handlerTask(injector: Injector) {
  return through.obj(async (chunk: any, enc: any, cb: any) => {
    if (chunk && chunk.contents) {
      files.push({
        path: chunk.relative,
        content: chunk.contents.toString(enc)
      });
    }
    cb();
  });
}

@Module({
  providers: [
    {
      provide: GulpToken,
      useFactory: () => {
        return gulp.src(path.join(__dirname, "../**/*"));
      }
    },
    {
      provide: AppInitialization,
      useFactory: (injector: Injector) => {
        return (injector: Injector) => {
          return new Promise(async (resolve, reject) => {
            let res = await handlerTask(injector);
            let _gulp = await injector.get(GulpToken);
            let ipfs = await injector.get(IpfsApi);
            let stream: WriteStream = _gulp
              .pipe(res)
              .pipe(gulp.dest(path.join(process.cwd(), "dist")));
            stream.on("end", async () => {
              let result = await ipfs.add(files);
              console.log(result);
              resolve();
            });
          });
        };
      }
    }
  ],
  imports: [ImsIpfsClientModule]
})
export class ImsGulpModule {}
bootstrapModule(ImsGulpModule).then(res => {});

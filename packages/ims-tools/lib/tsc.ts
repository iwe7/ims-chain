import gulp = require("gulp");
const ts = require("gulp-typescript");
const watch = require('gulp-watch')
import { join } from "path";
import { readdir, stat } from "./fs";
export async function tsc(path: string) {
  const dirs = await readdir(path);
  const stats = await Promise.all(
    dirs.map(async dir => {
      const s = await stat(dir);
      if (s.isDirectory()) {
        return await gulpTsc(dir);
      }
      return dir;
    })
  );
  return stats;
}

async function gulpTsc(dir: string) {
  const dirs = await readdir(dir);
  const tss = dirs.filter(dir => {
    return dir.includes("tsconfig");
  });
  return await Promise.all(tss.map(config => _tsc(config, dir)));
}

function _tsc(config: string, dir: string) {
  return new Promise<string>(async (resolve, reject) => {
    let tsProject = ts.createProject(config);
    const tsResult = watch(`${dir}/**/*.ts`).pipe(tsProject());
    tsResult.pipe(gulp.dest(join(dir)));
    tsResult.on("end", () => {
      resolve(config);
    });
    tsResult.on("error", (err: Error) => {
      reject(err);
    });
  });
}

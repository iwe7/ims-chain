"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const ts = require("gulp-typescript");
const watch = require('gulp-watch');
const path_1 = require("path");
const fs_1 = require("./fs");
async function tsc(path) {
    const dirs = await fs_1.readdir(path);
    const stats = await Promise.all(dirs.map(async (dir) => {
        const s = await fs_1.stat(dir);
        if (s.isDirectory()) {
            return await gulpTsc(dir);
        }
        return dir;
    }));
    return stats;
}
exports.tsc = tsc;
async function gulpTsc(dir) {
    const dirs = await fs_1.readdir(dir);
    const tss = dirs.filter(dir => {
        return dir.includes("tsconfig");
    });
    return await Promise.all(tss.map(config => _tsc(config, dir)));
}
function _tsc(config, dir) {
    return new Promise(async (resolve, reject) => {
        let tsProject = ts.createProject(config);
        const tsResult = watch(`${dir}/**/*.ts`).pipe(tsProject());
        tsResult.pipe(gulp.dest(path_1.join(dir)));
        tsResult.on("end", () => {
            resolve(config);
        });
        tsResult.on("error", (err) => {
            reject(err);
        });
    });
}

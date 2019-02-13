import fs = require("fs");
import { join } from "path";

export function readdir(path: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err: NodeJS.ErrnoException, files: string[]) => {
      if (err) return reject(err);
      return resolve(files.map(file => join(path, file)));
    });
  });
}

export function stat(file: string) {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(file, (err: NodeJS.ErrnoException, stats: fs.Stats) => {
      if (err) return reject(err);
      return resolve(stats);
    });
  });
}

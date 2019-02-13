import * as fs from "fs";
export { PathLike } from "fs";

export function readFile(
  path: fs.PathLike | number,
  options?: { encoding?: string; flag?: string }
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    return fs.readFile(
      path,
      options,
      (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

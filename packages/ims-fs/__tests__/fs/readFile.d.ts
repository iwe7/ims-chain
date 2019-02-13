/// <reference types="node" />
import * as fs from "fs";
export { PathLike } from "fs";
export declare function readFile(path: fs.PathLike | number, options?: {
    encoding?: string;
    flag?: string;
}): Promise<Buffer>;
//# sourceMappingURL=readFile.d.ts.map
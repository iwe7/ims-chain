import { Folder } from "./folder";
export declare abstract class FileSystemEntry {
    readonly name: string;
    readonly path: string;
    readonly lastModified: Date;
    readonly parent: Folder;
    abstract remove(): Promise<void>;
    abstract removeSync(onError: (err?: Error) => any): void;
    abstract rename(newname: string): Promise<void>;
    abstract renameSync(newname: string, onError?: (error: Error) => any): void;
}
//# sourceMappingURL=file-system-entry.d.ts.map
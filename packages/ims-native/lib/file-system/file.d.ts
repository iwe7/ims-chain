import { FileSystemEntry } from "./file-system-entry";
export declare abstract class File extends FileSystemEntry {
    readonly extension: string;
    readonly isLocked: boolean;
    readonly size: number;
    abstract readSync(onError?: (error: Error) => any): string;
    abstract writeSync(content: any, onError?: (error: any) => any): void;
    abstract readText(encoding?: string): Promise<string>;
    abstract readTextSync(onError?: (error: any) => any, encoding?: string): string;
    abstract writeText(content: string, encoding?: string): Promise<void>;
    abstract writeTextSync(content: string, onError?: (error: any) => any, encoding?: string): void;
    abstract checkAccess(): void;
}
//# sourceMappingURL=file.d.ts.map
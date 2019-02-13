import { FileSystemEntry } from "./file-system-entry";
import { File } from "./file";
export abstract class Folder extends FileSystemEntry {
  readonly isKnown: boolean;
  abstract contains(name: string): boolean;
  abstract clear(): Promise<void>;
  abstract clearSync(onError?: (error: any) => void): void;
  abstract getFile(name: string): File;
  abstract getFolder(name: string): Folder;
  abstract getEntities(): Promise<Array<FileSystemEntry>>;
  abstract getEntitiesSync(
    onError?: (error: any) => any
  ): Array<FileSystemEntry>;
  abstract eachEntity(onEntity: (entity: FileSystemEntry) => boolean): void;
}

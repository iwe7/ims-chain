export declare abstract class ImsNativeFs {
    abstract saveFile(): any;
    abstract removeSavedFile(): any;
    abstract openDocument(): any;
    abstract getSavedFileList(): any;
    abstract getSavedFileInfo(): any;
    abstract getFileSystemManager(): ImsNativeFsManager;
    abstract getFileInfo(): any;
}
export declare abstract class ImsNativeFsManager {
    abstract access(): any;
    abstract accessSync(): any;
    abstract appendFile(): any;
    abstract appendFileSync(): any;
    abstract copyFile(): any;
    abstract copyFileSync(): any;
    abstract getFileInfo(): any;
    abstract getSavedFileList(): any;
    abstract mkdir(): any;
    abstract mkdirSync(): any;
    abstract readdir(): any;
    abstract readdirSync(): any;
    abstract readFile(): any;
    abstract readFileSync(): any;
    abstract removeSavedFile(): any;
    abstract rename(): any;
    abstract renameSync(): any;
    abstract rmdir(): any;
    abstract rmdirSync(): any;
    abstract saveFile(): any;
    abstract saveFileSync(): any;
    abstract stat(): ImsNativeFsStats;
    abstract statSync(): ImsNativeFsStats;
    abstract unlink(): any;
    abstract unlinkSync(): any;
    abstract unzip(): any;
    abstract writeFile(): any;
    abstract writeFileSync(): any;
}
export declare abstract class ImsNativeFsStats {
    abstract isDirectory(): any;
    abstract isFile(): any;
}
//# sourceMappingURL=fs.d.ts.map
export declare class Ipfs {
}
export declare class Author {
    id: string;
    privKey: string;
    pubKey: string;
}
export declare class AuthorInfo {
    realname: string;
    mobile: string;
    nickname: string;
    avatar: string;
}
export declare class AuthorAddress {
    add(): void;
    addSafe(): void;
}
export declare class Loader {
    ipfs: Ipfs;
    author: Author;
    import(moduleName: string, normalizedParentName?: string): Promise<void>;
    resolve(moduleName: string, parentName?: string): Promise<void>;
    register(name: string, deps: string[], declare: (...modules: any[]) => any): Promise<void>;
    set(moduleName: string, module: any): Promise<void>;
    get(moduleName: string): Promise<void>;
    delete(moduleName: string): Promise<void>;
    config(config: any): Promise<void>;
}
//# sourceMappingURL=loader.d.ts.map
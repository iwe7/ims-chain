export declare abstract class ImsExec {
    readonly nginx: ImsExecNginx;
}
export declare abstract class ImsExecNginx {
    abstract reload(): void;
    abstract start(): void;
    abstract stop(): void;
}
//# sourceMappingURL=index.d.ts.map
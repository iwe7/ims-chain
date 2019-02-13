import { ImsExec, ImsExecNginx } from "ims-exec";
export declare class ImsExecMac extends ImsExec {
    readonly nginx: ImsExecNginxMac;
}
export declare class ImsExecNginxMac extends ImsExecNginx {
    private bin;
    reload(): void;
    start(): void;
    stop(): void;
}
//# sourceMappingURL=index.d.ts.map
export declare abstract class ImsUtility {
    abstract bindcall(): Promise<any>;
    abstract checkupgrade(): Promise<any>;
    abstract code(): Promise<any>;
    abstract emulator(): Promise<any>;
    abstract keyword(): Promise<any>;
    abstract modules(): Promise<any>;
    abstract subscribe(): Promise<any>;
    abstract sync(): Promise<any>;
    abstract user(): Promise<any>;
    readonly file: ImsUtilityFile;
    readonly job: ImsUtilityJob;
    readonly link: ImsUtilityLink;
    readonly verifycode: ImsUtilityVerifycode;
    readonly wxcode: ImsUtilityWxcode;
}
export declare abstract class ImsUtilityWxcode {
    abstract verifycode(): Promise<any>;
    abstract image(): Promise<any>;
}
export declare abstract class ImsUtilityVerifycode {
    abstract check_smscode(): Promise<any>;
    abstract send_code(): Promise<any>;
}
export declare abstract class ImsUtilityLink {
    abstract entry(): Promise<any>;
    abstract modulelink(): Promise<any>;
    abstract articlelist(): Promise<any>;
    abstract pagelist(): Promise<any>;
    abstract newslist(): Promise<any>;
    abstract catelist(): Promise<any>;
    abstract page(): Promise<any>;
    abstract news(): Promise<any>;
    abstract article(): Promise<any>;
}
export declare abstract class ImsUtilityJob {
    abstract list(): Promise<any>;
    abstract execute(): Promise<any>;
    abstract display(): Promise<any>;
}
export declare abstract class ImsUtilityFile {
    abstract upload(): Promise<any>;
    abstract fetch(): Promise<any>;
    abstract browser(): Promise<any>;
    abstract delete(): Promise<any>;
    abstract image(): Promise<any>;
    abstract module(): Promise<any>;
    abstract video(): Promise<any>;
    abstract voice(): Promise<any>;
    abstract news(): Promise<any>;
    abstract keyword(): Promise<any>;
    abstract networktowechat(): Promise<any>;
    abstract networktolocal(): Promise<any>;
    abstract towechat(): Promise<any>;
    abstract tolocal(): Promise<any>;
    abstract wechat_upload(): Promise<any>;
    abstract group_list(): Promise<any>;
    abstract add_group(): Promise<any>;
    abstract change_group(): Promise<any>;
    abstract del_group(): Promise<any>;
    abstract move_to_group(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
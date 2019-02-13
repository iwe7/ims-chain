export declare abstract class ImsAccount {
    readonly auth: ImsAccountAuth;
    readonly display: ImsAccountDisplay;
    readonly manage: ImsAccountManage;
    readonly postUser: ImsAccountPostUser;
    readonly post: ImsAccountPost;
    readonly recycle: ImsAccountRecycle;
    abstract postStep(): Promise<any>;
    abstract welcome(): Promise<any>;
}
export declare abstract class ImsAccountRecycle {
    abstract display(): Promise<any>;
    abstract recover(): Promise<any>;
    abstract delete(): Promise<any>;
}
export declare abstract class ImsAccountPost {
    abstract base(): Promise<any>;
    abstract sms(): Promise<any>;
    abstract modules_tpl(): Promise<any>;
}
export declare abstract class ImsAccountPostUser {
    abstract delete(): Promise<any>;
    abstract edit(): Promise<any>;
    abstract set_permission(): Promise<any>;
    abstract set_manager(): Promise<any>;
    abstract module(): Promise<any>;
}
export declare abstract class ImsAccountManage {
    abstract display(): Promise<any>;
    abstract delete(): Promise<any>;
}
export declare abstract class ImsAccountDisplay {
    abstract rank(): Promise<any>;
    abstract display(): Promise<any>;
    abstract switch(): Promise<any>;
    abstract platform(): Promise<any>;
}
export declare abstract class ImsAccountAuth {
    abstract ticket(): Promise<any>;
    abstract forward(): Promise<any>;
    abstract test(): Promise<any>;
    abstract confirm(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
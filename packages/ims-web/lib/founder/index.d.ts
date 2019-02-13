export declare abstract class ImsFounder {
    readonly display: ImsFounderDisplay;
    abstract create(): Promise<any>;
}
export declare abstract class ImsFounderDisplay {
    abstract display(): Promise<any>;
    abstract del(): Promise<any>;
}
export declare abstract class ImsFounderEdit {
    abstract edit_base(): Promise<any>;
    abstract edit_modules_tpl(): Promise<any>;
    abstract edit_account(): Promise<any>;
}
export declare abstract class ImsFounderGroup {
    abstract display(): Promise<any>;
    abstract post(): Promise<any>;
    abstract del(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
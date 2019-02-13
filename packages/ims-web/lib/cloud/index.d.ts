export declare abstract class ImsCloud {
    readonly diagnose: ImsCloudDiagnose;
    readonly dock: ImsCloudDock;
    readonly process: ImsCloudProcess;
    readonly redirect: ImsCloudRedirect;
    readonly smsSign: ImsCloudSmsSign;
    readonly upgrade: ImsCloudUpgrade;
    abstract login(): Promise<any>;
}
export declare abstract class ImsCloudUpgrade {
    abstract upgrade(): Promise<any>;
    abstract get_upgrade_info(): Promise<any>;
}
export declare abstract class ImsCloudSmsSign {
    abstract display(): Promise<any>;
    abstract save_sms_sign(): Promise<any>;
}
export declare abstract class ImsCloudRedirect {
    abstract profile(): Promise<any>;
    abstract callback(): Promise<any>;
    abstract appstore(): Promise<any>;
    abstract buybranch(): Promise<any>;
    abstract sms(): Promise<any>;
}
export declare abstract class ImsCloudProcess {
    abstract files(): Promise<any>;
    abstract schemas(): Promise<any>;
    abstract scripts(): Promise<any>;
}
export declare abstract class ImsCloudDiagnose {
    abstract display(): Promise<any>;
    abstract testapi(): Promise<any>;
}
export declare abstract class ImsCloudDock {
    abstract auth(): Promise<any>;
    abstract build(): Promise<any>;
    abstract init(): Promise<any>;
    abstract schema(): Promise<any>;
    abstract download(): Promise<any>;
    abstract moduleQuery(): Promise<any>;
    abstract moduleBought(): Promise<any>;
    abstract moduleInfo(): Promise<any>;
    abstract moduleBuild(): Promise<any>;
    abstract moduleSettingCloud(): Promise<any>;
    abstract themeQuery(): Promise<any>;
    abstract themeInfo(): Promise<any>;
    abstract themeBuild(): Promise<any>;
    abstract applicationBuild(): Promise<any>;
    abstract smsSend(): Promise<any>;
    abstract smsInfo(): Promise<any>;
    abstract apiOauth(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
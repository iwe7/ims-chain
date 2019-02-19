export abstract class ImsUtility {
    file: ImsUtilityFile;
    wxcode: ImsUtilityWxcode;
    abstract click(): Promise<any>;
    abstract share(): Promise<any>;
}

export abstract class ImsUtilityFile {
    abstract upload(): Promise<any>;
    abstract delete(): Promise<any>;
}

export abstract class ImsUtilityWxcode {
    abstract verifycode(): Promise<any>;
    abstract image(): Promise<any>;
    abstract qrcode(): Promise<any>;
}

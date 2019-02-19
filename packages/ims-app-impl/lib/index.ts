import {
    ImsAuth, ImsAuthSession, ImsAuthForget, ImsAuthLogin, ImsAuthRegister,
    ImsUtility, ImsUtilityFile, ImsUtilityWxcode
} from 'ims-app';

export class ImsAuthImpl extends ImsAuth {
    forget: ImsAuthForget = new ImsAuthForgetImpl();
    login: ImsAuthLogin = new ImsAuthLoginImpl();
    register: ImsAuthRegister = new ImsAuthRegisterImpl();
    session: ImsAuthSession = new ImsAuthSessionImpl();
    async forward(): Promise<any> { }
    async oauth(): Promise<any> { }
}

export class ImsAuthForgetImpl extends ImsAuthForget {
    async reset(): Promise<any> { }
    async forget(): Promise<any> { }
    async verifycode(): Promise<any> { }
}

export class ImsAuthLoginImpl extends ImsAuthLogin {
    async basic(): Promise<any> { }
    async uc(): Promise<any> { }
    async mobile_exist(): Promise<any> { }
}

export class ImsAuthRegisterImpl extends ImsAuthRegister {
    async register(): Promise<any> { }
    async uc(): Promise<any> { }
}

export class ImsAuthSessionImpl extends ImsAuthSession {
    async openid(): Promise<any> { }
    async userinfo(): Promise<any> { }
    async check(): Promise<any> { }
}

export class ImsUtilityImpl extends ImsUtility {
    file: ImsUtilityFile = new ImsUtilityFileImpl();
    wxcode: ImsUtilityWxcode = new ImsUtilityWxcodeImpl();
    async click(): Promise<any> { }
    async share(): Promise<any> { }
}

export class ImsUtilityFileImpl extends ImsUtilityFile {
    async upload(): Promise<any> { }
    async delete(): Promise<any> { }
}

export class ImsUtilityWxcodeImpl extends ImsUtilityWxcode {
    async verifycode(): Promise<any> { }
    async image(): Promise<any> { }
    async qrcode(): Promise<any> { }
}

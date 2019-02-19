export abstract class ImsAuth {
    forget: ImsAuthForget;
    login: ImsAuthLogin;
    register: ImsAuthRegister;
    session: ImsAuthSession;
    abstract forward(): Promise<any>;
    abstract oauth(): Promise<any>;
}

export abstract class ImsAuthForget {
    abstract reset(): Promise<any>;
    abstract forget(): Promise<any>;
    abstract verifycode(): Promise<any>;
}

export abstract class ImsAuthLogin {
    abstract basic(): Promise<any>;
    abstract uc(): Promise<any>;
    abstract mobile_exist(): Promise<any>;
}

export abstract class ImsAuthRegister {
    abstract register(): Promise<any>;
    abstract uc(): Promise<any>;
}

export abstract class ImsAuthSession {
    abstract openid(): Promise<any>;
    abstract userinfo(): Promise<any>;
    abstract check(): Promise<any>;
}

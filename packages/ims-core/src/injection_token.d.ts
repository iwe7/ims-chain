export declare class InjectionToken<T = any> {
    name: string;
    desc: string;
    multi: boolean;
    readonly hash: Promise<string>;
    constructor(name: string, desc: string, multi?: boolean);
    toString(): string;
    static fromString<T = any>(name: string, desc?: string, multi?: boolean): InjectionToken<T>;
    static fromType<T = any>(token: any, multi?: boolean): InjectionToken<any>;
}
export declare function stringify(token: any): string;
//# sourceMappingURL=injection_token.d.ts.map
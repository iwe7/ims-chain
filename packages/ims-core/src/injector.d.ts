import { InjectionToken } from "./injection_token";
import { StaticProvider } from "./provider";
import { Type } from "./type";
export interface Record<T = any> {
    fn: (injector: Injector) => Promise<T>;
    token: any;
    useCache?: boolean;
    value: T;
}
export declare function getCurrentInjector(): Injector;
export declare class Injector {
    providers: StaticProvider[];
    private parent;
    static top: Injector;
    static create(providers?: StaticProvider[], parent?: Injector | null): Promise<Injector>;
    records: Map<string, Record>;
    constructor(providers: StaticProvider[], parent: Injector | null);
    init(): Promise<void>;
    private handlerFactory;
    handlerStaticProvider(provider: StaticProvider): Promise<void>;
    getRecord(token: InjectionToken<any>): Promise<Record<any>>;
    getRecordByHash(hash: string): Record;
    getByHash<T>(hash: string, notFound?: T): Promise<any>;
    has(token: InjectionToken<any> | Type<any> | string): Promise<boolean>;
    get<T = any>(token: any, notFound?: T): Promise<T>;
    static get<T = any>(token: any, notFound?: T): Promise<T>;
    set<T>(token: InjectionToken<T>, factory: Record): Promise<void>;
}
//# sourceMappingURL=injector.d.ts.map
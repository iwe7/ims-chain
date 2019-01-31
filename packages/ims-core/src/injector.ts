import { InjectionToken } from "./injection_token";
import {
  StaticProvider,
  isStaticProviderFn,
  FactoryProvider,
  isFactoryProvider
} from "./provider";
import { Type } from "./type";
import { stringify } from "querystring";

export interface Record<T = any> {
  fn: (injector: Injector) => Promise<T>;
  token: any;
  useCache?: boolean;
  value: T;
}

export class Injector {
  static top: Injector = new Injector([], null);

  static async create(
    providers: StaticProvider[] = [],
    parent: Injector | null = Injector.top
  ) {
    let injector = new Injector(providers, parent);
    await injector.init();
    return injector;
  }

  public records: Map<string, Record> = new Map();

  constructor(
    public providers: StaticProvider[] = [],
    private parent: Injector | null
  ) {}

  async init() {
    let token = InjectionToken.fromType(Injector);
    this.set(token, {
      fn: () =>
        new Promise<Injector>((resolve, reject) => {
          resolve(this);
        }),
      value: this,
      useCache: true,
      token
    });
    for (let i = 0; i < this.providers.length; i++) {
      let provider = this.providers[i];
      await this.handlerStaticProvider(provider);
    }
  }

  private async handlerFactory(provider: FactoryProvider) {
    let token = provider.provide;
    let multi = !!token.multi;
    if (multi) {
      let value = await this.get(token);
      // 如果存在
      if (!Array.isArray(value)) {
        value = [];
      }
      this.set(token, {
        fn: new Proxy(provider.useFactory, {
          async apply(target: any, thisArg: any, argArray?: any) {
            let val = await Reflect.apply(target, thisArg, argArray);
            return value.concat(val);
          }
        }),
        useCache: false,
        value: undefined,
        token
      });
    } else {
      this.set(provider.provide, {
        fn: provider.useFactory,
        useCache: typeof provider.cache === "boolean" ? provider.cache : true,
        value: undefined,
        token
      });
    }
  }

  async handlerStaticProvider(provider: StaticProvider) {
    if (isStaticProviderFn(provider)) {
      provider = await provider(this);
      await this.handlerStaticProvider(provider);
    } else {
      if (isFactoryProvider(provider)) {
        await this.handlerFactory(provider);
      }
    }
  }

  async getRecord(token: InjectionToken<any>) {
    let hash = await token.hash;
    return this.getRecordByHash(hash);
  }

  getRecordByHash(hash: string): Record {
    let record = this.records.get(hash);
    if (record) return record;
    if (this.parent) {
      return this.parent.getRecordByHash(hash);
    }
    return undefined as any;
  }

  async getByHash<T>(hash: string, notFound?: T) {
    let record: Record<any> = this.getRecordByHash(hash) as Record<any>;
    if (record) {
      if (record.value && record.useCache) {
        return record.value;
      } else {
        record.value = await record.fn(this);
        this.records.set(hash, record);
        return record.value;
      }
    }
    if (record) {
      throw new Error(`not found ${stringify((record as Record).token)}`);
    }
    return notFound;
  }

  async has(token: InjectionToken<any> | Type<any> | string) {
    token = InjectionToken.fromType(token);
    let hash = await token.hash;
    let record = this.getRecordByHash(hash);
    return !!record;
  }

  async get<T>(
    token: InjectionToken<T> | Type<T> | string,
    notFound?: T
  ): Promise<T> {
    token = InjectionToken.fromType(token);
    let hash = await token.hash;
    return await this.getByHash(hash, notFound);
  }

  async set<T>(token: InjectionToken<T>, factory: Record) {
    let hash = await token.hash;
    this.records.set(hash, factory);
  }
}

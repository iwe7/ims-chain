import { InjectionToken } from "./injection_token";
import { StaticProvider, isStaticProviderFn } from "./provider";

export interface Record<T = any> {
  fn: (injector: Injector) => T;
  useCache?: boolean;
  multi?: boolean;
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

  private records: Map<string, Record> = new Map();

  constructor(
    public providers: StaticProvider[] = [],
    private parent: Injector | null
  ) {}

  async init() {
    this.set(InjectionToken.fromType(Injector), {
      fn: () => this,
      value: this,
      useCache: true,
      multi: false
    });
    for (let i = 0; i < this.providers.length; i++) {
      let provider = this.providers[i];
      await this.handlerStaticProvider(provider);
    }
  }
  async handlerStaticProvider(provider: StaticProvider) {
    if (isStaticProviderFn(provider)) {
      provider = await provider(this);
      await this.handlerStaticProvider(provider);
    } else {
      let deps: string[] = [];
      for (let i of provider.deps) {
        deps.push(await i.hash);
      }
      let multi = !!provider.multi;
      let token = provider.provide;
      let record = await this.getRecord(token);
      if (record && record.multi) {
        if (!multi) {
          throw new Error(`${token.name} is should be multi`);
        }
      }
      if (multi) {
        let value = await this.get(token);
        // 如果存在
        if (!Array.isArray(value)) {
          value = [];
        }
        this.set(token, {
          fn: new Proxy(provider.useFactory, {
            apply(target: any, thisArg: any, argArray?: any) {
              let val = Reflect.apply(target, thisArg, argArray);
              return value.concat(val);
            }
          }),
          useCache: !!provider.cache,
          value: undefined,
          multi: !!provider.multi
        });
      } else {
        this.set(provider.provide, {
          fn: provider.useFactory,
          useCache: !!provider.cache,
          value: undefined,
          multi: !!provider.multi
        });
      }
    }
  }

  async getRecord(token: InjectionToken<any>) {
    let hash = await token.hash;
    if (this.records.has(hash)) {
      let record = this.records.get(hash);
      if (record) return record;
    }
  }
  async get<T>(token: InjectionToken<T>, notFound?: T): Promise<T | T[]> {
    let record = await this.getRecord(token);
    let hash = await token.hash;
    if (record) {
      if (record.value && record.useCache) {
        return record.value;
      } else {
        record.value = record.fn(this);
        this.records.set(hash, record);
        return record.value;
      }
    }
    if (this.parent) {
      return this.parent.get(token, notFound);
    }
    console.error(`not found ${token.name}`);
    return notFound as T;
  }
  async set<T>(token: InjectionToken<T>, factory: Record) {
    let hash = await token.hash;
    this.records.set(hash, factory);
  }
}

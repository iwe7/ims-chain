import { InjectionToken } from "./injection_token";
import {
  StaticProvider,
  isStaticProviderFn,
  FactoryProvider,
  isFactoryProvider,
  ValueProvider
} from "./provider";

export interface Record<T = any> {
  fn: (injector: Injector) => Promise<T>;
  useCache?: boolean;
  multi?: boolean;
  value: T;
  deps: string[];
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
    this.set(InjectionToken.fromType(Injector), {
      fn: () =>
        new Promise<Injector>((resolve, reject) => {
          resolve(this);
        }),
      deps: [],
      value: this,
      useCache: true,
      multi: false
    });
    for (let i = 0; i < this.providers.length; i++) {
      let provider = this.providers[i];
      await this.handlerStaticProvider(provider);
    }
  }

  private async handlerFactory(provider: FactoryProvider) {
    let deps: string[] = [];
    if (provider) {
      for (let i of provider.deps || []) {
        deps.push(await i.hash);
      }
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
        multi: !!provider.multi,
        deps
      });
    } else {
      this.set(provider.provide, {
        fn: provider.useFactory,
        useCache: !!provider.cache,
        value: undefined,
        multi: !!provider.multi,
        deps
      });
    }
  }

  private async handlerValue(provider: ValueProvider) {
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
        fn: async () => {
          return value.concat(provider.useValue);
        },
        useCache: true,
        value: undefined,
        multi: true,
        deps: []
      });
    } else {
      this.set(token, {
        fn: async () => {
          return provider.useValue;
        },
        useCache: true,
        value: undefined,
        multi: false,
        deps: []
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
  getRecordByHash(hash: string): Record | undefined {
    let record = this.records.get(hash);
    if (record) return record;
    if (this.parent) {
      return this.parent.getRecordByHash(hash);
    }
  }
  async getByHash<T>(hash: string, notFound?: T) {
    let record = this.getRecordByHash(hash);
    if (record) {
      if (record.value && record.useCache) {
        return record.value;
      } else {
        if (record.deps.length > 0) {
          await Promise.all(record.deps.map(dep => this.getByHash(dep)));
        }
        record.value = await record.fn(this);
        this.records.set(hash, record);
        return record.value;
      }
    }
    return notFound;
  }
  async get<T>(token: InjectionToken<T>, notFound?: T): Promise<T> {
    let hash = await token.hash;
    return await this.getByHash(hash, notFound);
  }

  async set<T>(token: InjectionToken<T>, factory: Record) {
    let hash = await token.hash;
    this.records.set(hash, factory);
  }
}

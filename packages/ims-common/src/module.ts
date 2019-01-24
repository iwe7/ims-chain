import { makeDecorator, ClassMetadata, MetadataFactory } from "ims-decorator";
import { InjectionToken, Type, StaticProvider, Injector } from "ims-core";
import { AppInitialization } from "./tokens";
export interface Module {
  providers?: StaticProvider[];
  imports?: Type<any>[];
}
export const MODULE = InjectionToken.fromString("module");
export const Symbol_Module_Init = Symbol.for("Symbol_Module_Init");

export class ModuleMetadataFactory implements MetadataFactory {
  type(def: ClassMetadata<Module>) {
    return new Proxy(def.target, {
      construct(target: any, argArray: any, newTarget?: any) {
        let getImports = async (injector: Injector) => {
          let options = def.metadataDef;
          if (options) {
            let imports: any[] = [];
            let providers: any[] = [];
            providers = providers.concat(options.providers || []);
            imports = imports.concat(options.imports || []);
            if (imports && imports.length > 0) {
              for (let i of imports) {
                let t = await ModuleFactory.create(i, injector);
                t.injector.records.forEach((it, key) => {
                  injector.records.set(key, it);
                });
              }
            }
            for (let i of providers) {
              await injector.handlerStaticProvider(i);
            }
          }
        };
        let instance = Reflect.construct(target, argArray, newTarget);
        return new ModuleRef(instance, getImports);
      }
    });
  }
}

export class ModuleRef<T> {
  get injector(): Injector {
    return this._injector as Injector;
  }
  constructor(
    public instance: T,
    public onInit: (injector: Injector) => Promise<void>,
    private _injector?: Injector
  ) {}

  setInjector(injector: Injector) {
    this._injector = injector;
  }
}

export class ModuleFactory {
  static async create<T = any>(
    type: Type<any>,
    injector?: Injector
  ): Promise<ModuleRef<T>> {
    let instance = new type();
    injector = injector || (await Injector.create([]));
    instance.onInit && (await instance.onInit(injector));
    instance.setInjector(injector);
    let appInits = await injector.get(AppInitialization);
    if (Array.isArray(appInits)) {
      for (let init of appInits) {
        if (Array.isArray(init)) {
          throw new Error(`app initialization 不支持多级嵌套`);
        } else {
          await init(injector);
        }
      }
    }
    return instance;
  }
}

export const Module = makeDecorator<Module>(
  MODULE,
  def => {
    return def.metadataDef;
  },
  new ModuleMetadataFactory()
);

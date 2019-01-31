import { makeDecorator, MetadataFactory, ClassMetadata } from "ims-decorator";
import { InjectionToken, Injector, StaticProvider } from "ims-core";
export const INJECTABLE = InjectionToken.fromString("injectable");
export interface Injectable {
  provide?: InjectionToken;
  useFactory?: (injector: Injector) => Promise<any>;
  deps?: any[];
  useCache?: boolean;
}
export class InjectableMetadataFactory extends MetadataFactory {
  type(def: ClassMetadata<Injectable>): any {
    let opt = def.metadataDef || {};
    let params = new Array(def.target.length);
    let token = opt.provide || InjectionToken.fromType(def.target);
    if (opt && opt.useFactory) {
      let provider = <StaticProvider>{
        provide: token,
        useFactory: opt!.useFactory,
        deps: opt.deps || [],
        cache: !!opt.useCache
      };
      Injector.top.handlerStaticProvider(provider);
    } else {
      opt = opt || {
        deps: []
      };
      let provider = <StaticProvider>{
        provide: token,
        useFactory: async (injector: Injector) => {
          for (let param of def.parameters) {
            params[param.parameterIndex] = await injector.get(
              param.metadataDef || param.parameterType
            );
          }
          return new def.target(...params);
        },
        deps: opt.deps || [],
        cache: !!opt.useCache
      };
      Injector.top.handlerStaticProvider(provider);
    }
    return def.target;
  }
}

export const Injectable = makeDecorator<Injectable>(
  INJECTABLE,
  def => {
    return def.metadataDef;
  },
  new InjectableMetadataFactory()
);

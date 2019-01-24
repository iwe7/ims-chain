import { isNumber, isUndefined } from "./util";
/**
 * 执行顺讯
 * [(property)...]->[(parameter->method)...]->constructor->class
 * [属性...]->[((方法参数...)->方法)...]->[constructor...]->class
 * 声明周期 property|parameter|method|constructor|class
 * 声明周期 [始化完毕]init->[属性添加]add->[属性删除]delete->[属性更新]update->[方法调用]call
 * [开始前]:start->[进行中]:runing->[结束]:end
 */
import {
  MetadataType,
  ConstructorMetadata,
  ParameterMetadata,
  ClassMetadata,
  PropertyMetadata,
  MethodMetadata,
  MetadataFactory,
  MetadataDef
} from "./type";
import { InjectionToken } from "ims-core";
export interface IDecorator<T> extends Function {
  (o?: T): any;
  new (o?: T): any;
}
interface MakeDecoratorItem {
  constructorParameter: ConstructorMetadata[];
  parameters: ParameterMetadata[];
  propertys: PropertyMetadata[];
  methods: MethodMetadata[];
}
const MakeDecoratorCache: Map<any, MakeDecoratorItem> = new Map();

export function makeDecorator<T>(
  token: InjectionToken<MetadataFactory>,
  getDef?: (def: MetadataDef) => T,
  factory?: MetadataFactory
): IDecorator<T> {
  let constructorParameter: ConstructorMetadata[] = [];
  let parameters: ParameterMetadata[] = [];
  let propertys: PropertyMetadata[] = [];
  let methods: MethodMetadata[] = [];
  // 设置解析器
  let item: any = (metadataDef?: T) => {
    return <T>(
      target: any,
      propertyKey?: PropertyKey,
      descriptorOrParameterIndex?: TypedPropertyDescriptor<T> | number
    ) => {
      let res: any;
      if (isNumber(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods
            });
          }
          // constructor
          let config = MakeDecoratorCache.get(target) as MakeDecoratorItem;
          let def: ConstructorMetadata = {
            metadataType: MetadataType.constructor,
            metadataDef,
            target,
            token,
            parameterIndex: descriptorOrParameterIndex
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          // 收集constructor 装饰器
          config.constructorParameter.push(def);
          MakeDecoratorCache.set(target, config);
        } else {
          // parameter
          target = target.constructor;
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods
            });
          }
          let config = MakeDecoratorCache.get(target) as MakeDecoratorItem;
          let def: ParameterMetadata = {
            metadataType: MetadataType.parameter,
            metadataDef,
            target,
            token,
            propertyKey,
            parameterIndex: descriptorOrParameterIndex
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          // 收集方法参数装饰器
          config.parameters.push(def);
          MakeDecoratorCache.set(target, config);
        }
      } else if (isUndefined(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          // class
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods
            });
          }
          let config = MakeDecoratorCache.get(target) as MakeDecoratorItem;
          let def: ClassMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            parameters: config.constructorParameter,
            propertys: config.propertys,
            methods: config.methods
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          res = factory && factory.type(def);
        } else {
          // property
          target = target.constructor;
          if (!MakeDecoratorCache.has(target)) {
            MakeDecoratorCache.set(target, {
              constructorParameter,
              parameters,
              propertys,
              methods
            });
          }
          let config = MakeDecoratorCache.get(target) as MakeDecoratorItem;
          let def: PropertyMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            propertyKey
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          config.propertys.push(def);
          MakeDecoratorCache.set(target, config);
        }
      } else {
        // method
        target = target.constructor;
        if (!MakeDecoratorCache.has(target)) {
          MakeDecoratorCache.set(target, {
            constructorParameter,
            parameters,
            propertys,
            methods
          });
        }
        let config = MakeDecoratorCache.get(target) as MakeDecoratorItem;
        let def: MethodMetadata = {
          metadataType: MetadataType.method,
          metadataDef,
          target,
          token,
          parameters: config.parameters,
          propertyKey: propertyKey as PropertyKey
        };
        def.metadataDef = !!getDef ? getDef(def) : metadataDef;
        // 清空
        config.methods.push(def);
        config.parameters = [];
        MakeDecoratorCache.set(target, config);
      }
      return res;
    };
  };
  return item;
}

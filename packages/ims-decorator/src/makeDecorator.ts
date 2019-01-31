import {
  isNumber,
  isUndefined,
  getDesignParamTypes,
  getDesignType,
  getDesignReturnType
} from "./util";
import "reflect-metadata";
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

const constructorMap: Map<any, Set<ConstructorMetadata>> = new Map();
const parametersMap: Map<any, Set<ParameterMetadata>> = new Map();
const propertysMap: Map<any, Set<PropertyMetadata>> = new Map();
const methodsMap: Map<any, Set<MethodMetadata>> = new Map();
const classMap: Map<any, Set<ClassMetadata>> = new Map();

export function makeDecorator<T>(
  token: InjectionToken<MetadataFactory>,
  getDef?: (def: MetadataDef) => T,
  factory?: MetadataFactory
): IDecorator<T> {
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
          let paramTypes = getDesignParamTypes(target);
          if (!constructorMap.has(target)) {
            constructorMap.set(target, new Set());
          }
          // constructor
          let def: ConstructorMetadata = {
            metadataType: MetadataType.constructor,
            metadataDef,
            target,
            token,
            parameterIndex: descriptorOrParameterIndex,
            parameterType: paramTypes[descriptorOrParameterIndex]
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          constructorMap.set(target, constructorMap.get(target).add(def));
        } else {
          // parameter
          let paramTypes = getDesignParamTypes(target, propertyKey) || [];
          target = target.constructor;
          if (!parametersMap.has(target)) {
            parametersMap.set(target, new Set());
          }
          let def: ParameterMetadata = {
            metadataType: MetadataType.parameter,
            metadataDef,
            target,
            token,
            propertyKey,
            parameterIndex: descriptorOrParameterIndex,
            parameterType: paramTypes[descriptorOrParameterIndex]
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          // 收集方法参数装饰器
          parametersMap.set(target, parametersMap.get(target).add(def));
        }
      } else if (isUndefined(descriptorOrParameterIndex)) {
        if (isUndefined(propertyKey)) {
          // class
          let parameters: any[] = getDesignParamTypes(target) || [];
          parameters = parameters.map((param, index) => {
            return {
              parameterIndex: index,
              parameterType: param
            } as ConstructorMetadata;
          });
          if (!classMap.has(target)) {
            classMap.set(target, new Set());
          }
          let propertys = [];
          let methods = [];
          constructorMap.has(target) &&
            constructorMap.get(target).forEach(item => {
              parameters[item.parameterIndex] = item;
            });
          propertysMap.has(target) &&
            propertysMap.get(target).forEach(item => {
              propertys.push(item);
            });
          methodsMap.has(target) &&
            methodsMap.get(target).forEach(item => {
              methods.push(item);
            });
          let def: ClassMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            parameters,
            propertys,
            methods
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          res = factory && factory.type(def);
        } else {
          // property
          let designType = getDesignType(target, propertyKey);
          target = target.constructor;
          if (!propertysMap.has(target)) {
            propertysMap.set(target, new Set());
          }
          let def: PropertyMetadata = {
            metadataType: MetadataType.class,
            metadataDef,
            target,
            token,
            propertyKey,
            propertyType: designType
          };
          def.metadataDef = !!getDef ? getDef(def) : metadataDef;
          propertysMap.set(target, propertysMap.get(target).add(def));
        }
      } else {
        // method
        target = target.constructor;
        if (!methodsMap.has(target)) {
          methodsMap.set(target, new Set());
        }
        let parameters = [];
        parametersMap.get(target).forEach(parameter => {
          if (parameter.propertyKey === propertyKey) {
            parameters.push(parameter);
          }
        });
        let returnType = getDesignReturnType(target, propertyKey);
        let def: MethodMetadata = {
          metadataType: MetadataType.method,
          metadataDef,
          target,
          token,
          parameters,
          propertyKey: propertyKey as PropertyKey,
          returnType: returnType
        };
        def.metadataDef = !!getDef ? getDef(def) : metadataDef;
        methodsMap.set(target, methodsMap.get(target).add(def));
      }
      return res;
    };
  };
  return item;
}

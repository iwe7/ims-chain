import { Type, InjectionToken } from "ims-core";
export enum MetadataType {
  class,
  constructor,
  parameter,
  method,
  property
}
export interface BaseMetadata<D = any> {
  metadataType: MetadataType;
  metadataDef?: D;
  target: Type<any>;
  token: InjectionToken<MetadataFactory>;
}

export interface ClassMetadata<T = any> extends BaseMetadata<T> {
  parameters: ConstructorMetadata[];
  propertys: PropertyMetadata[];
  methods: MethodMetadata[];
}

export interface ConstructorMetadata<T = any> extends BaseMetadata<T> {
  parameterIndex: number;
}

export interface PropertyMetadata<T = any> extends BaseMetadata<T> {
  propertyKey: PropertyKey;
}

export interface MethodMetadata<T = any> extends BaseMetadata<T> {
  propertyKey: PropertyKey;
  parameters: ParameterMetadata[];
}

export interface ParameterMetadata<T = any> extends BaseMetadata<T> {
  propertyKey: PropertyKey;
  parameterIndex: number;
}

export type MetadataDef<T = any> =
  | ClassMetadata<T>
  | ConstructorMetadata<T>
  | PropertyMetadata<T>
  | MethodMetadata<T>
  | ParameterMetadata<T>;

export abstract class MetadataFactory {
  abstract type(def: ClassMetadata): any;
}

export function getMethodDef(
  def: ClassMetadata,
  p: PropertyKey
): MethodMetadata[] {
  return def.methods.filter(res => res.propertyKey === p);
}

export function getPropertyDef(
  def: ClassMetadata,
  p: PropertyKey
): PropertyMetadata[] {
  return def.propertys.filter(res => res.propertyKey === p);
}

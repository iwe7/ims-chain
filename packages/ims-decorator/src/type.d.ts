import { Type, InjectionToken } from "ims-core";
export declare enum MetadataType {
    class = 0,
    constructor = 1,
    parameter = 2,
    method = 3,
    property = 4
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
export declare type MetadataDef<T = any> = ClassMetadata<T> | ConstructorMetadata<T> | PropertyMetadata<T> | MethodMetadata<T> | ParameterMetadata<T>;
export declare abstract class MetadataFactory {
    abstract type(def: ClassMetadata): any;
}
export declare function getMethodDef(def: ClassMetadata, p: PropertyKey): MethodMetadata[];
export declare function getPropertyDef(def: ClassMetadata, p: PropertyKey): PropertyMetadata[];
//# sourceMappingURL=type.d.ts.map
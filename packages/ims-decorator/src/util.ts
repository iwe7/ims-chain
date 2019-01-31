export function isNumber(val: any): val is number {
  return typeof val === "number";
}
export function isUndefined(val: any): val is undefined {
  return val === undefined;
}

import "reflect-metadata";
const _getMetadata = (type: string) => (v: any, key?: any) => {
  return Reflect.getMetadata(type, v, key);
};
export const getDesignParamTypes = _getMetadata("design:paramtypes");
export const getDesignReturnType = _getMetadata("design:returntype");
export const getDesignType = _getMetadata("design:type");

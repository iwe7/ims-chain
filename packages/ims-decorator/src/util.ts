export function isNumber(val: any): val is number {
  return typeof val === "number";
}
export function isUndefined(val: any): val is undefined {
  return val === undefined;
}

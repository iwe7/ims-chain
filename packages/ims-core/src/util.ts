export function getClosureSafeProperty<T>(objWithPropertyToExtract: T): string {
  for (let key in objWithPropertyToExtract) {
    if (objWithPropertyToExtract[key] === (getClosureSafeProperty as any)) {
      return key;
    }
  }
  throw Error("Could not find renamed property on target object.");
}

export function isFunction(val: any): val is Function {
  return typeof val === "function";
}

export function isPromise(val: any): val is Promise<any> {
  return val && typeof val.then === "function";
}

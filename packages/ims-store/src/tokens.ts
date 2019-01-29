import { InjectionToken } from "ims-core";
export interface Store {
  connect(): Promise<void>;
  clear(): void;
  getItem<T>(key: string): T;
  removeItem(key: string): void;
  setItem(key: string, value: any): void;
}
export const Store = InjectionToken.fromString<Store>("Store");
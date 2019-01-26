import { InjectionToken } from "ims-core";
export interface GulpToken {
  pipe(...args: any[]): any;
}
export const GulpToken = InjectionToken.fromString<GulpToken>("gulp");

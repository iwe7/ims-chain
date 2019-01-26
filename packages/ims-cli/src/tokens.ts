import { InjectionToken } from "ims-core";
export const Commander = InjectionToken.fromString<any>("Commander");
export const Commands = InjectionToken.fromString<any[]>(
  "Commands",
  "Commands",
  true
);

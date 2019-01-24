import { InjectionToken, Injector } from "ims-core";
export interface AppInitialization {
  (injector: Injector): Promise<void>;
}
export const AppInitialization = InjectionToken.fromString<AppInitialization[]>(
  "AppInitialization"
);

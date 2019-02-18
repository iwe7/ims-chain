import { InjectionToken } from "ims-core";
export const Routes = InjectionToken.fromString<InjectionToken[]>(
    "ims cloud routes",
    "routes",
    true
);

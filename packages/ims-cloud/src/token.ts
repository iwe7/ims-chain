import { InjectionToken, Type } from "ims-core";
export const Routes = InjectionToken.fromString<InjectionToken[]>(
  "ims cloud routes"
);
export interface Config {
  port: number;
  host: string;
}
export const Config = InjectionToken.fromString<Config>("ims cloud config");

export const Fetch = InjectionToken.fromString<typeof fetch>("ims cloud Fetch");

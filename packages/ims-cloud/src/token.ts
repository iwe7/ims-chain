import { InjectionToken, Type } from "ims-core";
export const Routes = InjectionToken.fromString<InjectionToken[]>(
  "ims cloud routes",
  "routes",
  true
);
export interface Config {
  port: number;
  host: string;
}
export const Config = InjectionToken.fromString<Config>("ims cloud config");

export const Fetch = InjectionToken.fromString<typeof fetch>("ims cloud Fetch");

export interface After {
  path: string;
  handler: (req: any, res: any, next: any) => any;
}
export const After = InjectionToken.fromString<After[]>("After", "after", true);

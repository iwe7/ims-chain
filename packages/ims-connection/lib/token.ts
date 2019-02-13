import { InjectionToken } from "ims-core";
import { Transport as ITransport } from "./core";
export const Transport = InjectionToken.fromString<ITransport>(
  "Transport",
  "Transport",
  true
);

import { InjectionToken } from "ims-core";
import { Configuration } from "webpack";
export const WebpackConfiguration = InjectionToken.fromString<Configuration[]>(
  "WebpackConfigure",
  "WebpackConfigure",
  true
);

export const WebpackPlugin = InjectionToken.fromString(
  "WebpackPlugin",
  "WebpackPlugin",
  true
);

export const WebpackName = InjectionToken.fromString<string>(
  "WebpackName",
  "WebpackName"
);
export const WebpackDev = InjectionToken.fromString<boolean>(
  "WebpackDev",
  "WebpackDev"
);

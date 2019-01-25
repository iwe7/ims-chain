import { InjectionToken } from "ims-core";
import { Command } from "commander";
export const Commander = InjectionToken.fromString<Command>("Commander");
export const Commands = InjectionToken.fromString<Command[]>(
  "Commands",
  "Commands",
  true
);

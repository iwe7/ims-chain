export * from "./injectable";
export * from "./module";
export * from "./tokens";
export * from "./bootstrap";
export * from "./inject";
export * from "./app";
export * from "./query_string";
export * from "./getPath";
export * from "./toString";
export * from "./entry";
export * from "./routes";

export * from "ims-core";

export interface OnDestroy {
  ngOnDestroy(): void;
}

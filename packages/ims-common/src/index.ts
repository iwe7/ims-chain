export * from "./injectable";
export * from "./module";
export * from "./tokens";
export * from "./bootstrap";
export * from "./inject";
export * from "./app";

export * from "ims-core";

export interface OnDestroy {
  ngOnDestroy(): void;
}

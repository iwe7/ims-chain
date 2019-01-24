export function toString(json: any) {
  if (typeof json === "string") {
    return json;
  } else if (typeof json === "object") {
    return JSON.stringify(json);
  } else if (Reflect.has(json, "toString")) {
    return json.toString();
  } else {
    return "error";
  }
}

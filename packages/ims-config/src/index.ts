const json = require("./config.json");
import fs = require("fs");
import path = require("path");
import { DllReferencePlugin } from "webpack";
export class Config {
  constructor() {}


  get<T = any>(key: string): T {
    return json[key];
  }
  set<T = any>(key: string, value: T): void {
    json[key] = value;
    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(json));
  }
}

export default new Config();

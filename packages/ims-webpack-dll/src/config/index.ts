import path = require("path");
import fs = require("fs");
const json = () => require("./config.json");
export class Config {
  constructor() {}
  get<T = any>(key: string): T {
    return json()[key];
  }
  set<T = any>(key: string, value: T): void {
    const data = json();
    data[key] = value;
    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(data));
  }
}
export default new Config();

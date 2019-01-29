"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const json = () => require("./config.json");
class Config {
    constructor() { }
    get(key) {
        return json()[key];
    }
    set(key, value) {
        const data = json();
        data[key] = value;
        fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(data));
    }
}
exports.Config = Config;
exports.default = new Config();

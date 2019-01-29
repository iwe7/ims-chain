"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json = require("./config.json");
const fs = require("fs");
const path = require("path");
class Config {
    get(key) {
        return json[key];
    }
    set(key, value) {
        json[key] = value;
        fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(json));
    }
}
exports.Config = Config;
exports.default = new Config();

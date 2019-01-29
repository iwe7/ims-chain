"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DllConfig {
    getDll() {
        return {
            name: "dll",
            context: "dll",
            manifest: path.join(__dirname, "dll", "manifest.json")
        };
    }
}
exports.DllConfig = DllConfig;
exports.config = new DllConfig();

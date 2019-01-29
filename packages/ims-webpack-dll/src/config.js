"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.config = {
    name: "dll",
    context: "dll",
    manifest: path.join(__dirname, "dll", "manifest.json")
};

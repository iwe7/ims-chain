"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFetch() {
    try {
        return fetch;
    }
    catch (e) {
        return require("node-fetch");
    }
}
const core = getFetch();
exports.fetch = core;

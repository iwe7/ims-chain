"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toString(json) {
    try {
        if (typeof json === "string") {
            return json;
        }
        else if (typeof json === "object") {
            return JSON.stringify(json);
        }
        else if (Reflect.has(json, "toString")) {
            return json.toString();
        }
        else {
            return "error";
        }
    }
    catch (e) {
        return {
            message: e.message
        };
    }
}
exports.toString = toString;
//# sourceMappingURL=util.js.map
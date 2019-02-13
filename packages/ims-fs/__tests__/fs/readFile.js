"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readFile(path, options) {
    return new Promise((resolve, reject) => {
        return fs.readFile(path, options, (err, data) => {
            if (err)
                return reject(err);
            resolve(data);
        });
    });
}
exports.readFile = readFile;

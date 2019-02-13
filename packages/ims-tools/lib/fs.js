"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err)
                return reject(err);
            return resolve(files.map(file => path_1.join(path, file)));
        });
    });
}
exports.readdir = readdir;
function stat(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err)
                return reject(err);
            return resolve(stats);
        });
    });
}
exports.stat = stat;

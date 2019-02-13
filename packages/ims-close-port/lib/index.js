"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const { exec } = require("shelljs");
const timeout = 1000;
function close(port) {
    return new Promise(resolve => {
        const child = child_process.spawn("lsof", ["-i", `:${port}`]);
        child.stdout.on("data", rst => {
            let data = rst.toString("utf8", 0, rst.length);
            let port = null;
            data.split(/[\n|\r]/).forEach(item => {
                if (item.indexOf("LISTEN") !== -1 && !port) {
                    let reg = item.split(/\s+/);
                    if (/\d+/.test(reg[1])) {
                        port = reg[1];
                    }
                }
            });
            if (!port) {
                resolve(port);
                return;
            }
            exec(`kill -9 ${port}`, () => {
                console.log(`kill -9 ${port}`);
                resolve(port);
            });
        });
        child.stderr.on("data", rst => {
            let data = rst.toString("utf8", 0, rst.length);
            console.log(data);
            resolve(data);
        });
        child.stderr.on("end", () => {
            resolve();
        });
        child.stdout.on("end", () => {
            resolve();
        });
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
exports.close = close;

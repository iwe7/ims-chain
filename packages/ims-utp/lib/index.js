"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const utp = require("utp-native");
let UtpModule = class UtpModule {
    constructor() {
        const server = utp.createServer(function (socket) {
            socket.pipe(socket);
        });
        server.listen(10000, function () {
            const socket = utp.connect(10000);
            socket.write("hello world");
            socket.end();
            socket.on("data", function (data) {
                console.log("echo: " + data);
            });
            socket.on("end", function () {
                console.log("echo: (ended)");
            });
        });
    }
};
UtpModule = tslib_1.__decorate([
    ims_common_1.Module(),
    tslib_1.__metadata("design:paramtypes", [])
], UtpModule);
exports.UtpModule = UtpModule;
let _utp = new UtpModule();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_exec_1 = require("ims-exec");
const shelljs_1 = require("shelljs");
class ImsExecMac extends ims_exec_1.ImsExec {
    constructor() {
        super(...arguments);
        this.nginx = new ImsExecNginxMac();
    }
}
exports.ImsExecMac = ImsExecMac;
class ImsExecNginxMac extends ims_exec_1.ImsExecNginx {
    constructor() {
        super(...arguments);
        this.bin = "/usr/local/Cellar/nginx/1.15.8/bin/nginx";
    }
    reload() {
        const res = shelljs_1.exec(`${this.bin} -s reload`);
        if (res.code !== 0) {
            shelljs_1.echo(`Error:nginx.reload ${res.stderr}`);
        }
        else {
            shelljs_1.echo(`Success:nginx.reload ${res.stdout}`);
        }
        shelljs_1.exit(1);
    }
    start() {
        const res = shelljs_1.exec(`${this.bin}`);
        if (res.code !== 0) {
            shelljs_1.echo(`Error:nginx.start ${res.stderr}`);
        }
        else {
            shelljs_1.echo(`Success:nginx.start ${res.stdout}`);
        }
        shelljs_1.exit(1);
    }
    stop() {
        const res = shelljs_1.exec(`${this.bin} -s stop`);
        if (res.code !== 0) {
            shelljs_1.echo(`Error:nginx.stop ${res.stderr}`);
        }
        else {
            shelljs_1.echo(`Success:nginx.stop ${res.stdout}`);
        }
        shelljs_1.exit(1);
    }
}
exports.ImsExecNginxMac = ImsExecNginxMac;
const mac = new ImsExecMac();
mac.nginx.reload();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsDomain {
    constructor() {
        this.timeout = 60 * 60 * 1000;
    }
    listen() {
        this.refresh();
        setTimeout(() => {
            this.refresh();
        }, this.timeout);
    }
    refresh() {
    }
}
exports.ImsDomain = ImsDomain;

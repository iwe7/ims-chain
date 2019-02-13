"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Listener extends events_1.EventEmitter {
    constructor(options, handler) {
        super();
        this.options = options;
        this.handler = handler;
    }
}
exports.Listener = Listener;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_fs_1 = require("ims-fs");
const levelup_1 = require("levelup");
const leveldown_1 = require("leveldown");
class ImsFsLevel extends ims_fs_1.ImsFs {
    constructor(location) {
        super();
        this.db = levelup_1.default(leveldown_1.default(location));
    }
    isOpen() {
        return this.db.isOpen();
    }
    isClosed() {
        return this.db.isClosed();
    }
    open() {
        return this.db.open();
    }
    close() {
        return this.db.close();
    }
    batch(array, options) {
        return this.db.batch(array, options);
    }
    get(key) {
        return this.db.get(key);
    }
    put(key, value) {
        return this.db.put(key, value);
    }
    async del(key) {
        return this.db.del(key);
    }
    createReadStream() {
        return this.db.createReadStream();
    }
    createKeyStream() {
        return this.db.createKeyStream();
    }
    createValueStream() {
        return this.db.createValueStream();
    }
}
exports.ImsFsLevel = ImsFsLevel;

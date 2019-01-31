"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
let Pubsub = class Pubsub {
    subscribe() { }
    unsubscribe() { }
    publish() { }
    ls() { }
    peers() { }
    setMaxListeners() { }
};
Pubsub = tslib_1.__decorate([
    ims_common_1.Injectable()
], Pubsub);
exports.Pubsub = Pubsub;

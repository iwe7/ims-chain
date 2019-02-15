"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const multiaddr_1 = require("./multiaddr");
class NodeOptions {
}
exports.NodeOptions = NodeOptions;
class NodeMessage {
}
exports.NodeMessage = NodeMessage;
class Node {
    constructor(address) {
        this.addr = new multiaddr_1.Multiaddr(address);
        debugger;
        this.source = new rxjs_1.Observable(subscriber => {
            this.subscriber = subscriber;
        });
    }
    subscribe(...args) {
        return this.source.subscribe(...args);
    }
    connect(node) {
        node.subscribe({
            next: (data) => {
                this.next(data);
            }
        });
    }
    next(data) {
        data.from = this.addr.value;
        this.subscriber.next(data);
    }
    close() {
        this.subscriber.complete();
    }
    complete() {
        this.close();
    }
}
exports.Node = Node;

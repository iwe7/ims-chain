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
const node = new Node("/ip4/127.0.0.1/udp/134");
const node2 = new Node("/ip/127.0.0.1/udp/135");
node.next({
    to: node2.addr.value,
    type: "message",
    payload: {
        data: "hello"
    }
});
node.subscribe(res => {
    console.log(res);
});

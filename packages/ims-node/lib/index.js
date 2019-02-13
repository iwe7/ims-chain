"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class Node {
    constructor() {
        this.cache = new Map();
    }
    get friends() {
        let friends = [];
        this.cache.forEach(node => friends.push(node));
        return friends;
    }
    findNode(hash) {
        if (this.cache.has(hash)) {
            return rxjs_1.of(this.cache.get(hash));
        }
        if (this.friends.length > 0) {
            const obs = this.friends.map(node => node.findNode(hash).pipe(operators_1.filter(res => !!res)));
            return rxjs_1.race(...obs);
        }
        return rxjs_1.of(null);
    }
    addNode(hash) {
        let node = new Node();
        this.cache.set(hash, node);
        return node;
    }
}
exports.Node = Node;
let node = new Node();
node.addNode("2");
node
    .addNode("3")
    .addNode("1")
    .addNode("4");
node.findNode("4").subscribe(res => {
    console.log(res);
    debugger;
});

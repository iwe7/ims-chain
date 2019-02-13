import { Observable, of, race } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * 数据结构
 */

export class Node {
  cache: Map<string, Node> = new Map();

  get friends() {
    let friends = [];
    this.cache.forEach(node => friends.push(node));
    return friends;
  }

  constructor() {}

  findNode(hash: string): Observable<Node> {
    if (this.cache.has(hash)) {
      return of(this.cache.get(hash));
    }
    // 先查找自己的朋友，如果存在则返回
    if (this.friends.length > 0) {
      const obs = this.friends.map(node =>
        node.findNode(hash).pipe(filter(res => !!res))
      );
      return race(...obs);
    }
    return of(null);
  }
  addNode(hash: string) {
    let node = new Node();
    this.cache.set(hash, node);
    return node;
  }
}

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

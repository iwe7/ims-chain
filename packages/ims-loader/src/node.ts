import { Subscriber, Observable, PartialObserver, Subscription } from "rxjs";
import { Multiaddr } from "./multiaddr";

export class NodeOptions {
  host: string;
  port: string;
}

export class NodeMessage<T> {
  from?: string;
  to: string;
  type: string;
  payload: T;
}

export class Node<T = any> {
  source: Observable<NodeMessage<T>>;
  subscriber: Subscriber<NodeMessage<T>>;
  addr: Multiaddr;

  constructor(address: string) {
    this.addr = new Multiaddr(address);
    debugger;
    this.source = new Observable<NodeMessage<T>>(subscriber => {
      this.subscriber = subscriber;
    });
  }

  subscribe(observer?: PartialObserver<T>): Subscription;
  subscribe(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription;
  subscribe(...args: any[]) {
    return this.source.subscribe(...args);
  }

  connect(node: Node) {
    node.subscribe({
      next: (data: any) => {
        this.next(data);
      }
    });
  }

  next(data: NodeMessage<T>): void {
    data.from = this.addr.value;
    this.subscriber.next(data);
  }

  close(): void {
    this.subscriber.complete();
  }

  complete(): void {
    this.close();
  }
}

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

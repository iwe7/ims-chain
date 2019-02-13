declare type WriteFileOptions = {
    encoding?: string | null;
    mode?: number | string;
    flag?: string;
};
declare type ReadFileOptions = {
    encoding?: string | null;
    flag?: string;
};
export declare class Fs {
    writeFile(path: string, data: any, options?: WriteFileOptions): void;
    readFile(path: string, options?: ReadFileOptions): void;
}
import { Subscriber, Observable, PartialObserver, Subscription } from "rxjs";
import { Multiaddr } from "./multiaddr";
export declare class NodeOptions {
    host: string;
    port: string;
}
export declare class NodeMessage<T> {
    from: string;
    to: string;
    type: string;
    payload: T;
}
export declare class Node<T = any> {
    source: Observable<NodeMessage<T>>;
    subscriber: Subscriber<NodeMessage<T>>;
    addr: Multiaddr;
    constructor(address: string);
    subscribe(observer?: PartialObserver<T>): Subscription;
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    connect(node: Node): void;
    next(data: NodeMessage<T>): void;
    close(): void;
    complete(): void;
}
export {};
//# sourceMappingURL=fs.d.ts.map
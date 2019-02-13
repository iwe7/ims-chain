import { Observable } from "rxjs";
export declare class Node {
    cache: Map<string, Node>;
    readonly friends: any[];
    constructor();
    findNode(hash: string): Observable<Node>;
    addNode(hash: string): Node;
}
//# sourceMappingURL=index.d.ts.map
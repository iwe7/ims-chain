import { Observable, Subscriber, Operator, PartialObserver } from "rxjs";
export declare class SigleObservable<T> extends Observable<T> {
    constructor(ctrl: (subscriber: Subscriber<T>) => any);
}
export interface ICreatePipe<T, R> {
    (value: T, index: number, destion: PartialObserver<any> | Subscriber<any>): R;
}
export declare function createPipe<T, R>(predicate: ICreatePipe<T, R>): (source: Observable<T>) => Observable<R>;
export declare function createOperator<T, R>(predicate: ICreatePipe<T, R>): Operator<T, R>;
export declare function createSubscriber<T, R>(subscriber: Subscriber<R>, predicate: ICreatePipe<T, R>): Subscriber<T>;
//# sourceMappingURL=pull.test.d.ts.map
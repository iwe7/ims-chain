import { PartialObserver, Subscription } from "rxjs";
export interface Reducer<T = any> {
    (action: Action<T>, state: T): T;
}
export interface Action<T = any> {
    type: string;
    payload: T;
}
export declare class StateObservable<T> {
    initState: T;
    reducers: Reducer<T>[];
    private source;
    constructor(initState: T, reducers?: Reducer<T>[]);
    dispatch(item: Action<T>): void;
    subscribe(observer?: PartialObserver<T>): Subscription;
    getState(): T;
}
//# sourceMappingURL=state.d.ts.map
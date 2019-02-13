import { ReducersMapObject } from "redux";
import { Observable, Subscriber, TeardownLogic } from "rxjs";
export declare class Store extends Observable<any> {
    private store;
    constructor(reducers: ReducersMapObject<any, any>);
    dispatch(action: {
        type: string;
        payload?: any;
    }): void;
    getState(): any;
    _subscribe(subscriber: Subscriber<any>): TeardownLogic;
}
//# sourceMappingURL=action.d.ts.map
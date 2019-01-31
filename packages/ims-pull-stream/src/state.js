"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class StateObservable {
    constructor(initState, reducers = []) {
        this.initState = initState;
        this.reducers = reducers;
        this.source = new rxjs_1.BehaviorSubject(initState);
    }
    dispatch(item) {
        let state = this.getState();
        this.reducers.forEach(redu => {
            state = redu(item, state);
        });
        this.source.next(state);
    }
    subscribe(observer) {
        return this.source
            .pipe(obs => {
            return obs.lift({
                call: (subscriber, source) => {
                    return () => { };
                }
            });
        })
            .subscribe(observer);
    }
    getState() {
        return this.source.value;
    }
}
exports.StateObservable = StateObservable;

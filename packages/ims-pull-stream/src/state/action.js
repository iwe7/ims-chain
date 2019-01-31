"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const rxjs_1 = require("rxjs");
class Store extends rxjs_1.Observable {
    constructor(reducers) {
        super();
        this.store = redux_1.createStore(redux_1.combineReducers(reducers));
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
    getState() {
        return this.store.getState();
    }
    _subscribe(subscriber) {
        this.store.subscribe(() => {
            subscriber.next(this.getState());
        });
        return super._subscribe(subscriber);
    }
}
exports.Store = Store;
function counter(state = 0, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}
let store = new Store({
    counter: counter
});
store.subscribe(() => {
    console.log(store.getState());
});
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

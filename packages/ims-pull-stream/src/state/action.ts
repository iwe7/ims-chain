import {
  createStore,
  Store as ReduxStore,
  combineReducers,
  ReducersMapObject
} from "redux";
import { Observable, Subscriber, TeardownLogic } from "rxjs";

export class Store extends Observable<any> {
  private store: ReduxStore;
  constructor(reducers: ReducersMapObject<any, any>) {
    super();
    this.store = createStore(combineReducers(reducers));
  }
  /**
   * dispatch
   * @param action
   */
  dispatch(action: { type: string; payload?: any }) {
    this.store.dispatch(action);
  }
  /**
   * 获取状态
   */
  getState() {
    return this.store.getState();
  }

  /**
   * _subscribe
   * @param subscriber
   */
  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    this.store.subscribe(() => {
      subscriber.next(this.getState());
    });
    return super._subscribe(subscriber);
  }
}

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

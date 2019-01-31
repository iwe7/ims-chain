import { PartialObserver, Subscription, BehaviorSubject } from "rxjs";

export interface Reducer<T = any> {
  (action: Action<T>, state: T): T;
}

export interface Action<T = any> {
  type: string;
  payload: T;
}

export class StateObservable<T> {
  private source: BehaviorSubject<T>;
  /**
   * 创建
   * @param initState 初始状态
   * @param reducers 操作集
   */
  constructor(public initState: T, public reducers: Reducer<T>[] = []) {
    this.source = new BehaviorSubject(initState);
  }
  /**
   * 触发
   * @param item
   */
  dispatch(item: Action<T>) {
    let state: T = this.getState();
    this.reducers.forEach(redu => {
      state = redu(item, state);
    });
    this.source.next(state);
  }
  /**
   * 监听
   * @param observer
   */
  subscribe(observer?: PartialObserver<T>): Subscription {
    return this.source
      .pipe(obs => {
        return obs.lift({
          call: (subscriber, source) => {
            return () => {};
          }
        });
      })
      .subscribe(observer);
  }
  /**
   * 获取当前状态
   */
  getState(): T {
    return this.source.value;
  }
}

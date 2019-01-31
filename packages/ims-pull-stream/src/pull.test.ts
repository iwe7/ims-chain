import {
  Observable,
  Subscriber,
  TeardownLogic,
  Operator,
  PartialObserver
} from "rxjs";
export class SigleObservable<T> extends Observable<T> {
  constructor(ctrl: (subscriber: Subscriber<T>) => any) {
    super(ctrl);
  }
}

export interface ICreatePipe<T, R> {
  (value: T, index: number, destion: PartialObserver<any> | Subscriber<any>): R;
}
export function createPipe<T, R>(predicate: ICreatePipe<T, R>) {
  return (source: Observable<T>) => {
    return source.lift(createOperator(predicate));
  };
}

export function createOperator<T, R>(
  predicate: ICreatePipe<T, R>
): Operator<T, R> {
  class _operator implements Operator<T, R> {
    call(subscriber: Subscriber<R>, source: Observable<T>): TeardownLogic {
      source.subscribe(createSubscriber(subscriber, predicate));
    }
  }
  return new _operator();
}

export function createSubscriber<T, R>(
  subscriber: Subscriber<R>,
  predicate: ICreatePipe<T, R>
): Subscriber<T> {
  class _Subscriber extends Subscriber<T> {
    constructor() {
      super(subscriber);
    }
    index: number = 0;
    protected _next(value: T): void {
      this.index++;
      try {
        predicate(value, this.index, this.destination);
      } catch (e) {
        this.destination.error(e);
      }
    }
  }
  return new _Subscriber();
}

let sigle = new SigleObservable((obs: Subscriber<any>) => {
  obs.next("hello");
  obs.complete();
  return obs.unsubscribe();
});

sigle
  .pipe(obs => {
    return obs;
  })
  .subscribe(res => console.log(res));

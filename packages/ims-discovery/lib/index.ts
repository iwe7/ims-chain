import { Observable } from "rxjs";
export abstract class Discovery<T = any> extends Observable<T> {
  abstract start(): any;
  abstract stop(): any;
}

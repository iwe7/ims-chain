export interface CallBack<I = any> {
  (err?: Error, info?: I): any;
}

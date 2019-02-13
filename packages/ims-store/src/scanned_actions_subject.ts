import { Injectable, OnDestroy, Provider } from "ims-common";
import { Subject } from "rxjs";
import { Action } from "./models";

@Injectable()
export class ScannedActionsSubject extends Subject<Action>
  implements OnDestroy {
  ngOnDestroy() {
    this.complete();
  }
}

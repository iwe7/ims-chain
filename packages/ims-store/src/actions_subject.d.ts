import { OnDestroy } from "ims-common";
import { BehaviorSubject } from "rxjs";
import { Action } from "./models";
export declare const INIT: "@ngrx/store/init";
export declare class ActionsSubject extends BehaviorSubject<Action> implements OnDestroy {
    constructor();
    next(action: Action): void;
    complete(): void;
    ngOnDestroy(): void;
}
//# sourceMappingURL=actions_subject.d.ts.map
import { OnDestroy } from "ims-common";
import { Subject } from "rxjs";
import { Action } from "./models";
export declare class ScannedActionsSubject extends Subject<Action> implements OnDestroy {
    ngOnDestroy(): void;
}
//# sourceMappingURL=scanned_actions_subject.d.ts.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const rxjs_1 = require("rxjs");
exports.INIT = "@ngrx/store/init";
let ActionsSubject = class ActionsSubject extends rxjs_1.BehaviorSubject {
    constructor() {
        super({ type: exports.INIT });
    }
    next(action) {
        if (typeof action === "undefined") {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === "undefined") {
            throw new TypeError(`Actions must have a type property`);
        }
        super.next(action);
    }
    complete() {
    }
    ngOnDestroy() {
        super.complete();
    }
};
ActionsSubject = tslib_1.__decorate([
    ims_common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ActionsSubject);
exports.ActionsSubject = ActionsSubject;

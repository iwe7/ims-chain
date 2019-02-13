"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const rxjs_1 = require("rxjs");
let ScannedActionsSubject = class ScannedActionsSubject extends rxjs_1.Subject {
    ngOnDestroy() {
        this.complete();
    }
};
ScannedActionsSubject = tslib_1.__decorate([
    ims_common_1.Injectable()
], ScannedActionsSubject);
exports.ScannedActionsSubject = ScannedActionsSubject;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALL_HISTORY_METHOD = "@@router/CALL_HISTORY_METHOD";
function updateLocation(method) {
    return (...args) => ({
        type: exports.CALL_HISTORY_METHOD,
        payload: { method, args }
    });
}
exports.push = updateLocation("push");
exports.replace = updateLocation("replace");
exports.go = updateLocation("go");
exports.goBack = updateLocation("goBack");
exports.goForward = updateLocation("goForward");
exports.routerActions = { push: exports.push, replace: exports.replace, go: exports.go, goBack: exports.goBack, goForward: exports.goForward };

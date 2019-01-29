"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
function routerMiddleware(history) {
    return () => (next) => (action) => {
        if (action.type !== actions_1.CALL_HISTORY_METHOD) {
            return next(action);
        }
        const { payload: { method, args } } = action;
        history[method](...args);
    };
}
exports.default = routerMiddleware;

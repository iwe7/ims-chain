"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
const initialState = {
    locationBeforeTransitions: null
};
function routerReducer(state = initialState, { type, payload } = {}) {
    if (type === exports.LOCATION_CHANGE) {
        return { ...state, locationBeforeTransitions: payload };
    }
    return state;
}
exports.routerReducer = routerReducer;

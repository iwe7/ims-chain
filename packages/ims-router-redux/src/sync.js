"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reducer_1 = require("./reducer");
const defaultSelectLocationState = (state) => state.routing;
function syncHistoryWithStore(history, store, { selectLocationState = defaultSelectLocationState, adjustUrlOnReplay = true } = {}) {
    if (typeof selectLocationState(store.getState()) === "undefined") {
        throw new Error("Expected the routing state to be available either as `state.routing` " +
            "or as the custom expression you can specify as `selectLocationState` " +
            "in the `syncHistoryWithStore()` options. " +
            "Ensure you have added the `routerReducer` to your store's " +
            "reducers via `combineReducers` or whatever method you use to isolate " +
            "your reducers.");
    }
    let initialLocation;
    let isTimeTraveling;
    let unsubscribeFromStore;
    let unsubscribeFromHistory;
    let currentLocation;
    const getLocationInStore = (useInitialIfEmpty) => {
        const locationState = selectLocationState(store.getState());
        return (locationState.locationBeforeTransitions ||
            (useInitialIfEmpty ? initialLocation : undefined));
    };
    initialLocation = getLocationInStore();
    if (adjustUrlOnReplay) {
        const handleStoreChange = () => {
            const locationInStore = getLocationInStore(true);
            if (currentLocation === locationInStore ||
                initialLocation === locationInStore) {
                return;
            }
            isTimeTraveling = true;
            currentLocation = locationInStore;
            history.transitionTo({
                ...locationInStore,
                action: "PUSH"
            });
            isTimeTraveling = false;
        };
        unsubscribeFromStore = store.subscribe(handleStoreChange);
        handleStoreChange();
    }
    const handleLocationChange = (location) => {
        if (isTimeTraveling) {
            return;
        }
        currentLocation = location;
        if (!initialLocation) {
            initialLocation = location;
            if (getLocationInStore()) {
                return;
            }
        }
        store.dispatch({
            type: reducer_1.LOCATION_CHANGE,
            payload: location
        });
    };
    unsubscribeFromHistory = history.listen(handleLocationChange);
    if (history.getCurrentLocation) {
        handleLocationChange(history.getCurrentLocation());
    }
    return {
        ...history,
        listen(listener) {
            let lastPublishedLocation = getLocationInStore(true);
            let unsubscribed = false;
            const unsubscribeFromStore = store.subscribe(() => {
                const currentLocation = getLocationInStore(true);
                if (currentLocation === lastPublishedLocation) {
                    return;
                }
                lastPublishedLocation = currentLocation;
                if (!unsubscribed) {
                    listener(lastPublishedLocation);
                }
            });
            if (!history.getCurrentLocation) {
                listener(lastPublishedLocation);
            }
            return () => {
                unsubscribed = true;
                unsubscribeFromStore();
            };
        },
        unsubscribe() {
            if (adjustUrlOnReplay) {
                unsubscribeFromStore();
            }
            unsubscribeFromHistory();
        }
    };
}
exports.default = syncHistoryWithStore;

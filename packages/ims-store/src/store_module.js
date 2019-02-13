"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const utils_1 = require("./utils");
const tokens_1 = require("./tokens");
const actions_subject_1 = require("./actions_subject");
const reducer_manager_1 = require("./reducer_manager");
const scanned_actions_subject_1 = require("./scanned_actions_subject");
const store_1 = require("./store");
let StoreRootModule = class StoreRootModule {
    constructor(actions$, reducer$, scannedActions$, store) { }
};
StoreRootModule = tslib_1.__decorate([
    ims_common_1.Module({}),
    tslib_1.__metadata("design:paramtypes", [actions_subject_1.ActionsSubject,
        reducer_manager_1.ReducerObservable,
        scanned_actions_subject_1.ScannedActionsSubject,
        store_1.Store])
], StoreRootModule);
exports.StoreRootModule = StoreRootModule;
let StoreFeatureModule = class StoreFeatureModule {
    constructor(features, featureReducers, reducerManager, root) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        const feats = features.map((feature, index) => {
            const featureReducerCollection = featureReducers.shift();
            const reducers = featureReducerCollection[index];
            return {
                ...feature,
                reducers,
                initialState: _initialStateFactory(feature.initialState)
            };
        });
        reducerManager.addFeatures(feats);
    }
    ngOnDestroy() {
        this.reducerManager.removeFeatures(this.features);
    }
};
StoreFeatureModule = tslib_1.__decorate([
    ims_common_1.Module({}),
    tslib_1.__param(0, ims_common_1.Inject(tokens_1._STORE_FEATURES)),
    tslib_1.__param(1, ims_common_1.Inject(tokens_1.FEATURE_REDUCERS)),
    tslib_1.__metadata("design:paramtypes", [Array, Array, reducer_manager_1.ReducerManager,
        StoreRootModule])
], StoreFeatureModule);
exports.StoreFeatureModule = StoreFeatureModule;
function _createStoreReducers(injector, reducers, tokenReducers) {
    return reducers instanceof ims_common_1.InjectionToken ? injector.get(reducers) : reducers;
}
exports._createStoreReducers = _createStoreReducers;
function _createFeatureStore(injector, configs, featureStores) {
    return featureStores.map(async (feat, index) => {
        let item = configs[index];
        if (item instanceof ims_common_1.InjectionToken) {
            const conf = await injector.get(item);
            return {
                key: feat.key,
                reducerFactory: conf.reducerFactory
                    ? conf.reducerFactory
                    : utils_1.combineReducers,
                metaReducers: conf.metaReducers ? conf.metaReducers : [],
                initialState: conf.initialState
            };
        }
        return feat;
    });
}
exports._createFeatureStore = _createFeatureStore;
function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
    const reducers = reducerCollection.map((reducer, index) => {
        return reducer instanceof ims_common_1.InjectionToken ? injector.get(reducer) : reducer;
    });
    return reducers;
}
exports._createFeatureReducers = _createFeatureReducers;
function _initialStateFactory(initialState) {
    if (typeof initialState === "function") {
        return initialState();
    }
    return initialState;
}
exports._initialStateFactory = _initialStateFactory;

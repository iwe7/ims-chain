import { OnDestroy, InjectionToken, Injector } from "ims-common";
import { Action, ActionReducerMap, ActionReducerFactory, StoreFeature, InitialState, MetaReducer } from "./models";
import { ActionsSubject } from "./actions_subject";
import { ReducerManager, ReducerObservable } from "./reducer_manager";
import { ScannedActionsSubject } from "./scanned_actions_subject";
import { Store } from "./store";
export declare class StoreRootModule {
    constructor(actions$: ActionsSubject, reducer$: ReducerObservable, scannedActions$: ScannedActionsSubject, store: Store<any>);
}
export declare class StoreFeatureModule implements OnDestroy {
    private features;
    private featureReducers;
    private reducerManager;
    constructor(features: StoreFeature<any, any>[], featureReducers: ActionReducerMap<any>[], reducerManager: ReducerManager, root: StoreRootModule);
    ngOnDestroy(): void;
}
export declare type StoreConfig<T, V extends Action = Action> = {
    initialState?: InitialState<T>;
    reducerFactory?: ActionReducerFactory<T, V>;
    metaReducers?: MetaReducer<T, V>[];
};
export declare function _createStoreReducers(injector: Injector, reducers: ActionReducerMap<any, any>, tokenReducers: ActionReducerMap<any, any>): Promise<{}> | ActionReducerMap<any, any>;
export declare function _createFeatureStore(injector: Injector, configs: StoreConfig<any, any>[] | InjectionToken<StoreConfig<any, any>>[], featureStores: StoreFeature<any, any>[]): Promise<StoreFeature<any, any> | {
    key: string;
    reducerFactory: ActionReducerFactory<any, any>;
    metaReducers: MetaReducer<any, any>[];
    initialState: InitialState<any>;
}>[];
export declare function _createFeatureReducers(injector: Injector, reducerCollection: ActionReducerMap<any, any>[], tokenReducerCollection: ActionReducerMap<any, any>[]): (Promise<{}> | ActionReducerMap<any, any>)[];
export declare function _initialStateFactory(initialState: any): any;
//# sourceMappingURL=store_module.d.ts.map
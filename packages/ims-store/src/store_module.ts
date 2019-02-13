import {
  Module as NgModule,
  Inject,
  OnDestroy,
  InjectionToken,
  Injector
} from "ims-common";
import {
  Action,
  ActionReducerMap,
  ActionReducerFactory,
  StoreFeature,
  InitialState,
  MetaReducer
} from "./models";
import { combineReducers } from "./utils";
import {
  _INITIAL_REDUCERS,
  _REDUCER_FACTORY,
  _INITIAL_STATE,
  _STORE_REDUCERS,
  FEATURE_REDUCERS,
  _FEATURE_REDUCERS,
  _FEATURE_REDUCERS_TOKEN,
  _STORE_FEATURES,
  _FEATURE_CONFIGS
} from "./tokens";
import { ActionsSubject } from "./actions_subject";
import { ReducerManager, ReducerObservable } from "./reducer_manager";
import { ScannedActionsSubject } from "./scanned_actions_subject";
import { Store } from "./store";

@NgModule({})
export class StoreRootModule {
  constructor(
    actions$: ActionsSubject,
    reducer$: ReducerObservable,
    scannedActions$: ScannedActionsSubject,
    store: Store<any>
  ) {}
}

@NgModule({})
export class StoreFeatureModule implements OnDestroy {
  constructor(
    @Inject(_STORE_FEATURES) private features: StoreFeature<any, any>[],
    @Inject(FEATURE_REDUCERS) private featureReducers: ActionReducerMap<any>[],
    private reducerManager: ReducerManager,
    root: StoreRootModule
  ) {
    const feats = features.map((feature, index) => {
      const featureReducerCollection = featureReducers.shift();
      const reducers = featureReducerCollection /*TODO(#823)*/![index];

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
}

export type StoreConfig<T, V extends Action = Action> = {
  initialState?: InitialState<T>;
  reducerFactory?: ActionReducerFactory<T, V>;
  metaReducers?: MetaReducer<T, V>[];
};

export function _createStoreReducers(
  injector: Injector,
  reducers: ActionReducerMap<any, any>,
  tokenReducers: ActionReducerMap<any, any>
) {
  return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}

export function _createFeatureStore(
  injector: Injector,
  configs: StoreConfig<any, any>[] | InjectionToken<StoreConfig<any, any>>[],
  featureStores: StoreFeature<any, any>[]
) {
  return featureStores.map(async (feat, index) => {
    let item = configs[index];
    if (item instanceof InjectionToken) {
      const conf = await injector.get<StoreConfig<any, any>>(item);
      return {
        key: feat.key,
        reducerFactory: conf.reducerFactory
          ? conf.reducerFactory
          : combineReducers,
        metaReducers: conf.metaReducers ? conf.metaReducers : [],
        initialState: conf.initialState
      };
    }
    return feat;
  });
}

export function _createFeatureReducers(
  injector: Injector,
  reducerCollection: ActionReducerMap<any, any>[],
  tokenReducerCollection: ActionReducerMap<any, any>[]
) {
  const reducers = reducerCollection.map((reducer, index) => {
    return reducer instanceof InjectionToken ? injector.get(reducer) : reducer;
  });

  return reducers;
}

export function _initialStateFactory(initialState: any): any {
  if (typeof initialState === "function") {
    return initialState();
  }

  return initialState;
}

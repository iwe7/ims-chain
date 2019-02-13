"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEqualCheck(a, b) {
    return a === b;
}
exports.isEqualCheck = isEqualCheck;
function isArgumentsChanged(args, lastArguments, comparator) {
    for (let i = 0; i < args.length; i++) {
        if (!comparator(args[i], lastArguments[i])) {
            return true;
        }
    }
    return false;
}
function resultMemoize(projectionFn, isResultEqual) {
    return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
exports.resultMemoize = resultMemoize;
function defaultMemoize(projectionFn, isArgumentsEqual = isEqualCheck, isResultEqual = isEqualCheck) {
    let lastArguments = null;
    let lastResult = null;
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    function memoized() {
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        lastArguments = arguments;
        const newResult = projectionFn.apply(null, arguments);
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized, reset };
}
exports.defaultMemoize = defaultMemoize;
function createSelector(...input) {
    return createSelectorFactory(defaultMemoize)(...input);
}
exports.createSelector = createSelector;
function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        const args = selectors.map(fn => fn(state));
        return memoizedProjector.memoized.apply(null, args);
    }
    const args = selectors.map(fn => fn(state, props));
    return memoizedProjector.memoized.apply(null, [...args, props]);
}
exports.defaultStateFn = defaultStateFn;
function createSelectorFactory(memoize, options = {
    stateFn: defaultStateFn
}) {
    return function (...input) {
        let args = input;
        if (Array.isArray(args[0])) {
            const [head, ...tail] = args;
            args = [...head, ...tail];
        }
        const selectors = args.slice(0, args.length - 1);
        const projector = args[args.length - 1];
        const memoizedSelectors = selectors.filter((selector) => selector.release && typeof selector.release === "function");
        const memoizedProjector = memoize(function (...selectors) {
            return projector.apply(null, selectors);
        });
        const memoizedState = defaultMemoize(function (state, props) {
            if (selectors.length === 0 && props !== undefined) {
                return projector.apply(null, [state, props]);
            }
            return options.stateFn.apply(null, [
                state,
                selectors,
                props,
                memoizedProjector
            ]);
        });
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach(selector => selector.release());
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized
        });
    };
}
exports.createSelectorFactory = createSelectorFactory;
function createFeatureSelector(featureName) {
    return createSelector((state) => state[featureName], (featureState) => featureState);
}
exports.createFeatureSelector = createFeatureSelector;

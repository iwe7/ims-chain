"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_warning_1 = require("tiny-warning");
const tiny_invariant_1 = require("tiny-invariant");
const history_1 = require("history");
const PathUtils_1 = require("./PathUtils");
const createTransitionManager_1 = require("./createTransitionManager");
const DOMUtils_1 = require("./DOMUtils");
const PopStateEvent = 'popstate';
const HashChangeEvent = 'hashchange';
function getHistoryState() {
    try {
        return window.history.state || {};
    }
    catch (e) {
        return {};
    }
}
function createBrowserHistory(props = {}) {
    tiny_invariant_1.default(DOMUtils_1.canUseDOM, 'Browser history needs a DOM');
    const globalHistory = window.history;
    const canUseHistory = DOMUtils_1.supportsHistory();
    const needsHashChangeListener = !DOMUtils_1.supportsPopStateOnHashChange();
    const { forceRefresh = false, getUserConfirmation = DOMUtils_1.getConfirmation, keyLength = 6 } = props;
    const basename = props.basename
        ? PathUtils_1.stripTrailingSlash(PathUtils_1.addLeadingSlash(props.basename))
        : '';
    function getDOMLocation(historyState) {
        const { key, state } = historyState || {};
        const { pathname, search, hash } = window.location;
        let path = pathname + search + hash;
        tiny_warning_1.default(!basename || PathUtils_1.hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' +
            'with the basename. Expected path "' +
            path +
            '" to begin with "' +
            basename +
            '".');
        if (basename)
            path = PathUtils_1.stripBasename(path, basename);
        return history_1.createLocation(path, state, key);
    }
    function createKey() {
        return Math.random()
            .toString(36)
            .substr(2, keyLength);
    }
    const transitionManager = createTransitionManager_1.default();
    function setState(nextState) {
        Object.assign(history, nextState);
        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    }
    function handlePopState(event) {
        if (DOMUtils_1.isExtraneousPopstateEvent(event))
            return;
        handlePop(getDOMLocation(event.state));
    }
    function handleHashChange() {
        handlePop(getDOMLocation(getHistoryState()));
    }
    let forceNextPop = false;
    function handlePop(location) {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        }
        else {
            const action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, ok => {
                if (ok) {
                    setState({ action, location });
                }
                else {
                    revertPop(location);
                }
            });
        }
    }
    function revertPop(fromLocation) {
        const toLocation = history.location;
        let toIndex = allKeys.indexOf(toLocation.key);
        if (toIndex === -1)
            toIndex = 0;
        let fromIndex = allKeys.indexOf(fromLocation.key);
        if (fromIndex === -1)
            fromIndex = 0;
        const delta = toIndex - fromIndex;
        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    }
    const initialLocation = getDOMLocation(getHistoryState());
    let allKeys = [initialLocation.key];
    function createHref(location) {
        return basename + PathUtils_1.createPath(location);
    }
    function push(path, state) {
        tiny_warning_1.default(!(typeof path === 'object' &&
            path.state !== undefined &&
            state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
            'argument is a location-like object that already has state; it is ignored');
        const action = 'PUSH';
        const location = history_1.createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, ok => {
            if (!ok)
                return;
            const href = createHref(location);
            const { key, state } = location;
            if (canUseHistory) {
                globalHistory.pushState({ key, state }, null, href);
                if (forceRefresh) {
                    window.location.href = href;
                }
                else {
                    const prevIndex = allKeys.indexOf(history.location.key);
                    const nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextKeys.push(location.key);
                    allKeys = nextKeys;
                    setState({ action, location });
                }
            }
            else {
                tiny_warning_1.default(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                window.location.href = href;
            }
        });
    }
    function replace(path, state) {
        tiny_warning_1.default(!(typeof path === 'object' &&
            path.state !== undefined &&
            state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' +
            'argument is a location-like object that already has state; it is ignored');
        const action = 'REPLACE';
        const location = history_1.createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, ok => {
            if (!ok)
                return;
            const href = createHref(location);
            const { key, state } = location;
            if (canUseHistory) {
                globalHistory.replaceState({ key, state }, null, href);
                if (forceRefresh) {
                    window.location.replace(href);
                }
                else {
                    const prevIndex = allKeys.indexOf(history.location.key);
                    if (prevIndex !== -1)
                        allKeys[prevIndex] = location.key;
                    setState({ action, location });
                }
            }
            else {
                tiny_warning_1.default(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                window.location.replace(href);
            }
        });
    }
    function go(n) {
        globalHistory.go(n);
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    let listenerCount = 0;
    function checkDOMListeners(delta) {
        listenerCount += delta;
        if (listenerCount === 1 && delta === 1) {
            window.addEventListener(PopStateEvent, handlePopState);
            if (needsHashChangeListener)
                window.addEventListener(HashChangeEvent, handleHashChange);
        }
        else if (listenerCount === 0) {
            window.removeEventListener(PopStateEvent, handlePopState);
            if (needsHashChangeListener)
                window.removeEventListener(HashChangeEvent, handleHashChange);
        }
    }
    let isBlocked = false;
    function block(prompt = false) {
        const unblock = transitionManager.setPrompt(prompt);
        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }
        return () => {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }
            return unblock();
        };
    }
    function listen(listener) {
        const unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return () => {
            checkDOMListeners(-1);
            unlisten();
        };
    }
    const history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };
    return history;
}
exports.default = createBrowserHistory;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_dom_1 = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const ims_router_redux_1 = require("ims-router-redux");
const pages = require("./pages/index");
require("./index.scss");
const React = require("react");
const store = redux_1.createStore(redux_1.combineReducers({
    routing: ims_router_redux_1.routerReducer
}));
const app = document.getElementById("app");
let getBaseHash = () => {
    return location.pathname.split("/")[1];
};
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_dom_1.BrowserRouter, { basename: getBaseHash() },
        React.createElement("div", null,
            React.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: pages.WelcomePage }),
            React.createElement(react_router_dom_1.Route, { path: "/page1", component: pages.IndexPage1 }),
            React.createElement(react_router_dom_1.Route, { path: "/page2", component: pages.IndexPage2 })))), app);

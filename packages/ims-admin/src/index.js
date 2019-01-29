"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_dom_1 = require("react-dom");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const ims_router_redux_1 = require("ims-router-redux");
const pages = require("./pages/index");
require("./index.scss");
console.log("load admin success");
const store = redux_1.createStore(redux_1.combineReducers({
    routing: ims_router_redux_1.routerReducer
}));
const app = document.getElementById("app");
let getBaseHash = () => {
    return location.pathname.split("/")[1];
};
react_dom_1.render(react_1.createElement(react_redux_1.Provider, { store: store },
    react_1.createElement(react_router_dom_1.BrowserRouter, { basename: getBaseHash() },
        react_1.createElement("div", null,
            react_1.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: pages.WelcomePage }),
            react_1.createElement(react_router_dom_1.Route, { path: "/page1", component: pages.IndexPage1 }),
            react_1.createElement(react_router_dom_1.Route, { path: "/page2", component: pages.IndexPage2 }),
            react_1.createElement(react_router_dom_1.Route, { path: "/login", component: pages.LoginPage }),
            react_1.createElement(react_router_dom_1.Route, { path: "/home", component: pages.HomePage })))), app);

import { render } from "react-dom";
import { createElement } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { routerReducer } from "ims-router-redux";
import * as pages from "./pages/index";
import "./index.scss";
import React= require("react");


const store = createStore(
  combineReducers({
    routing: routerReducer
  })
);

const app = document.getElementById("app");
let getBaseHash = () => {
  return location.pathname.split("/")[1];
};
render(
  <Provider store={store}>
    <Router basename={getBaseHash()}>
      <div>
        <Route path="/" exact component={pages.WelcomePage} />
        <Route path="/page1" component={pages.IndexPage1} />
        <Route path="/page2" component={pages.IndexPage2} />
      </div>
    </Router>
  </Provider>,
  app
);

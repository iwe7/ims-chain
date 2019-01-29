"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
class IndexPage extends react_1.Component {
    render() {
        return react_1.createElement("div", null, "page");
    }
}
exports.IndexPage = IndexPage;
class IndexPage1 extends react_1.Component {
    render() {
        return react_1.createElement("div", null, "page1");
    }
}
exports.IndexPage1 = IndexPage1;
class IndexPage2 extends react_1.Component {
    render() {
        return react_1.createElement("div", null, "page2");
    }
}
exports.IndexPage2 = IndexPage2;
var login_1 = require("./login/login");
exports.LoginPage = login_1.LoginPage;
var home_1 = require("./home/home");
exports.HomePage = home_1.HomePage;
var welcome_1 = require("./welcome/welcome");
exports.WelcomePage = welcome_1.WelcomePage;

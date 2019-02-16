"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = require("history");
const react_dom_1 = require("react-dom");
const React = require("react");
const pathToRegexp = require('path-to-regexp');
const history = history_1.createBrowserHistory();
class Page404 extends React.Component {
    render() {
        return 404 < /div>;
    }
}
exports.Page404 = Page404;
async function bootstrap(pages, injector, id) {
    renderTo(pages, injector, id);
    history.listen(async (location, action) => {
        await renderTo(pages, injector, id);
    });
    console.log('router bootstrap');
}
exports.bootstrap = bootstrap;
async function renderTo(pages, injector, id) {
    const qs = await injector.get(QueryString);
    const query = qs.parse(location.search);
    const path = query.r || '/';
    const page = pages.find(page => {
        const keys = [];
        const re = pathToRegexp(page.path, keys);
        return re.test(path);
    });
    if (page) {
        react_dom_1.render(/>, id));
    }
    else {
        react_dom_1.render(/>, id));
    }
}

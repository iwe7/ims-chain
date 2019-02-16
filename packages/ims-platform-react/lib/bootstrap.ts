import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import React = require('react');
const pathToRegexp = require('path-to-regexp');
import { Page, Injector, Injectable, Inject } from 'ims-common';
const history = createBrowserHistory();

export class Page404 extends React.Component {
    render() {
        return <div>404</div>
    }
}

export async function bootstrap(pages: Page[], injector: Injector, id: any) {
    renderTo(pages, injector, id);
    history.listen(async (location, action) => {
        await renderTo(pages, injector, id);
    });
    console.log('router bootstrap')
}

async function renderTo(pages: Page[], injector: Injector, id: any) {
    const qs = await injector.get<QueryString>(QueryString);
    const query = qs.parse(location.search);
    // r router
    const path = query.r || '/';
    const page = pages.find(page => {
        const keys = [];
        const re = pathToRegexp(page.path, keys);
        return re.test(path)
    });
    if (page) {
        render(<page.component />, id)
    } else {
        render(<Page404 />, id)
    }
}

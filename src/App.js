import React from 'react';
import { BrowserRouter, Switch, Route, StaticRouter } from 'react-router-dom';
import PageLoader from './components/PageLoader';
import Navigation from './components/Navigation';
import { getRouterBasename, isBrowser } from './helpers';

function App({ location = window.location, pageJson, navJson }) {
    const RootChildren = () => (
        <>
            <header>
                <Navigation items={navJson} />
            </header>

            <div className="container">
                <Switch>
                    <Route path="/" render={props => <PageLoader
                        pageJson={pageJson}
                        location={location}
                        {...props}
                    />} />
                </Switch>
            </div>

            <footer>
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                <br />
                Copyright © 2020
            </footer>
        </>
    );

    return isBrowser() ? (
        <BrowserRouter basename={getRouterBasename(location)}>
            <RootChildren />
        </BrowserRouter>
    ) : (
        <StaticRouter basename={getRouterBasename(location)}>
            <RootChildren />
        </StaticRouter>
    )
}

export default App;

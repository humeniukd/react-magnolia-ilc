import React from 'react';
import { BrowserRouter, Switch, Route, StaticRouter } from 'react-router-dom';
import PageLoader from './helpers/PageLoader';
import Navigation from './components/Navigation';
import { getRouterBasename, isBrowser } from './helpers/AppHelpers';

function App({ location }) {
    const RootChildren = ({ location }) => (
        <>
            <header>
                <Navigation location={location} />
            </header>

            <div className="container">
                <Switch>
                    <Route path="/" render={props => <PageLoader location={location} {...props} />} />
                </Switch>
            </div>

            <footer>
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                <br />
                Copyright © 2020
            </footer>
        </>
    );

    if (isBrowser()) {
        return (
            <BrowserRouter basename={getRouterBasename(window.location)}>
                <RootChildren location={window.location}/>
            </BrowserRouter>
        );
    }
    return (
        <StaticRouter basename={getRouterBasename(location)}>
            <RootChildren location={location} />
        </StaticRouter>
    );
}

export default App;

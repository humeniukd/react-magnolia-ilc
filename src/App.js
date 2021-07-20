import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageLoader from './helpers/PageLoader';
import Navigation from './components/Navigation';
import { getRouterBasename } from './helpers/AppHelpers';

function App() {
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

    return (
        <BrowserRouter basename={getRouterBasename(window.location)}>
            <RootChildren location={window.location}/>
        </BrowserRouter>
    );
}

export default App;

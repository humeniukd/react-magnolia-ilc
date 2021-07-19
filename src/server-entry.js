import App from './App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default function render(location) {
    return ReactDOMServer.renderToString(<App location={location} />);
}
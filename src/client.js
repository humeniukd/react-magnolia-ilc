import React from 'react';
import ilcAdapterReact from 'ilc-adapter-react';
import App from './App';

function RootComponent() {
    return <App pageJson={ window.__pageJson__ } navJson={window.__navJson__} />
}

export default ilcAdapterReact({
    rootComponent: RootComponent,
});
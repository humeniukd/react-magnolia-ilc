'use strict';

import React from 'react'
import App from './App';

export default function (appSdk, url) {
    return (
        <App appSdk={appSdk} url={url}/>
    );
}
'use strict';

import React from 'react'
import App from './App';
export { loadPage, fetchNav } from "./api";

export default function (appSdk, location, pageJson, navJson) {
    return (
        <App
          appSdk={appSdk}
          location={location}
          pageJson={pageJson}
          navJson={navJson}
        />
    );
}

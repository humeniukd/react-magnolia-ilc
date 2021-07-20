/* eslint-env node */
const path = require('path');
const ilcWebpackPluginsFactory = require('ilc-sdk').WebpackPluginsFactory;
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/client.js'),
    output: {
        filename: 'client.js',
        libraryTarget: 'system',
        path: path.resolve(__dirname, 'build'),
        jsonpFunction: 'wpMgnlApp', // We need this to avoid conflicts of on-demand chunks in the global namespace
        devtoolNamespace: '@portal/mgnl',
    },
    mode: 'production',
    module: {
        rules: [
            {parser: {system: false}},
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },{
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
            REACT_APP_MGNL_HOST: JSON.stringify(process.env.REACT_APP_MGNL_HOST),
            REACT_APP_MGNL_IS_PREVIEW: JSON.stringify(process.env.REACT_APP_MGNL_IS_PREVIEW),
            REACT_APP_MGNL_DAM_RAW: JSON.stringify(process.env.REACT_APP_MGNL_DAM_RAW),
            REACT_APP_MGNL_LANGUAGES: JSON.stringify(process.env.REACT_APP_MGNL_LANGUAGES),
            REACT_APP_MGNL_BASE_AUTHOR: JSON.stringify(process.env.REACT_APP_MGNL_BASE_AUTHOR),
            REACT_APP_MGNL_BASE_PUBLIC: JSON.stringify(process.env.REACT_APP_MGNL_BASE_PUBLIC),
            REACT_APP_MGNL_APP_BASE: JSON.stringify(process.env.REACT_APP_MGNL_APP_BASE),
            REACT_APP_MGNL_API_TEMPLATES: JSON.stringify(process.env.REACT_APP_MGNL_API_TEMPLATES),
            REACT_APP_MGNL_API_PAGES: JSON.stringify(process.env.REACT_APP_MGNL_API_PAGES),
            REACT_APP_MGNL_API_PAGES_PREVIEW: JSON.stringify(process.env.REACT_APP_MGNL_API_PAGES_PREVIEW),
            REACT_APP_MGNL_API_NAV: JSON.stringify(process.env.REACT_APP_MGNL_API_NAV),
            REACT_APP_MGNL_STATIC: JSON.stringify(process.env.REACT_APP_MGNL_STATIC)
        }),
        ...ilcWebpackPluginsFactory().client
    ],
    devtool: 'source-map',
    externals: [
        /^single-spa$/,
        /^react$/,
        /^react\/lib.*/,
        /^react-dom$/,
        /^react-router-dom$/,
        /.*react-dom.*/,
    ],
};


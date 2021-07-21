/* eslint-env node */
const path = require('path');
const ilcWebpackPluginsFactory = require('ilc-sdk').WebpackPluginsFactory;
const vars = require('./webpack.define');

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
        vars,
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


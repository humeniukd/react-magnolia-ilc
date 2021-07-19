const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');
const webpack = require('webpack');

const wpModule =  {
    rules: [
        {
            test: /\.js?$/,
            exclude: [path.resolve(__dirname, 'node_modules')],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            }
        }
    ],
};

module.exports = [{
    entry: path.resolve(__dirname, 'src/client-entry.spa.js'),
    output: {
        filename: 'client.js',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, 'build'),
    },
    module: wpModule,
    plugins: [
        new WrapperPlugin({
            test: /\.js$/, // only wrap output of bundle files with '.js' extension
            header: '(function(define){\n',
            footer: '\n})((window.ILC && window.ILC.define) || window.define);'
        }),
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
    ],
    devtool: 'source-map',
    mode: 'production',
},
{
    entry: path.resolve(__dirname, 'src/client-entry.js'),
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: wpModule,
    plugins: [],
    devtool: 'source-map',
    mode: 'production',
},
{
    entry: path.resolve(__dirname, 'src/server-entry.js'),
    target: 'node',
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'build'),
    },
    module: wpModule,
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
    ],
    devtool: 'source-map',
    mode: 'production',
}];


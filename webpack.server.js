/* eslint-env node */
const config = require('./webpack.config.js');
const path = require('path');
const ilcWebpackPluginsFactory = require('ilc-sdk').WebpackPluginsFactory;
const vars = require('./webpack.define');

config.entry = path.resolve(__dirname, 'src/server.js');
config.mode = 'development';
config.node = false;
config.target = 'node';
config.output.filename = 'server.js';
config.output.libraryTarget = 'commonjs2';

config.plugins = [
    vars,
    ...ilcWebpackPluginsFactory({
        publicPathDetection: {
            ssrPublicPath: require('./publicPathTpl')(require('./PORT.json'))
        }
    }).server
];

config.externals = [ 'react', 'react-dom' ];


module.exports = config;



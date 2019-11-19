require('ignore-styles');
require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env','@babel/preset-react']
})

require('asset-require-hook')

require('./server.js');
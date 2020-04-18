'use strict';

const path = require(`path`);

module.exports = {
    mode: `development`,
    entry: `./wwwroot/js/main.js`,
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, `wwwroot/build`),
    },
    devtool: `source-map`,
    watch: true
};

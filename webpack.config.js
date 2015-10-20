var path = require('path');
var webpack = require('webpack');
module.exports = {
    output: {
        filename: "public/_tmp/bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "eslint-loader"
            }
        ],
        loaders: [ // NOTE: the loaders option should be nested in a module object!!
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            }
        ]
    },
    resolve: {
        root: [
            path.join(__dirname, "bower_components"),
            path.join(__dirname, "vendor")
        ],
        // extensions: ["", ".js"],
        alias: {
            // bower_components
            "js-base64": "js-base64/base64.js", // NOTE: bower.jsonのmainがarrayになっている場合、resolveに失敗するのでaliasを指定
            //"jquery-simplecolorpicker": "jquery-simplecolorpicker", // NOTE: js,css両方が欲しいので

            // vendor
            "jcscript": "jcscript/jCanvaScript.1.5.18.min.js",
        }
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery",
        })
    ],
    eslint: {
        configFile: "./.eslintrc"
    }
};


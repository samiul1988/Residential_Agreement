const path = require('path');

module.exports = (env) =>{
    // const isProd = env === "production";

    return {
        entry:'./src/index.js', //'./src/index.js'   './src/components/Playground.js'
        output:{
            path:path.join(__dirname,'public'),
            filename:'bundle.js'
        },
        module:{
            rules:[{
                loader:'babel-loader',
                test:/\.js$/,
                exclude:/node_modules/
            },{
                test:/\.s?css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(png|jpg|JPG|jpeg|gif|ico|svg)$/,
                use: [
                    'file-loader'
                ]
            }]
        },
        // target: 'node',

        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
        //     global: true,
        //     crypto: "empty",
        //     process: true,
        //     module: false,
        //     clearImmediate: false,
        //     setImmediate: false
        // }

        // mode:'development'
    }
};
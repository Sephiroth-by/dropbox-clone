module.exports = {
    entry: "./Scripts/app/index.jsx", 
    output:{
        path: "./Scripts/public",
        filename: "script.js"    
    },
    resolve:{   
        extensions: ["", ".js", ".jsx"] 
    },
    module:{
        loaders:[   
            {
                test: /\.jsx?$/, 
                exclude: /(node_modules)/,
                loader: ["babel-loader"],
                query:{
                    presets:["es2015", "react"]
                }
            }
        ]
    }
}
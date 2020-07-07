const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Timestamp = new Date().getTime();
const webpack = require("webpack")

const isProduction = process.env.NODE_ENV === "production";
const productionConfig = {
  plugins: [
    new CompressionPlugin({
      test: /\.js$|\.html$|\.css/,
      threshold: 10240,
      deleteOriginalAssets: false
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true, // 去掉debugger
            drop_console: true // 去掉console
          }
        }
      })
    ]
  },
  output: {
    // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
    filename: `js/[name].${Timestamp}.js`,
    chunkFilename: `js/[name].${Timestamp}.js`
  }
};
const webpackConfig = {
  externals: {
    vue: "Vue", // element-ui需要vue在前面
    jquery: "jQuery",
    videoPlayer: "VueVideoPlayer",
    "element-ui": "ELEMENT"
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    })
  ]
};

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ["emoji-vue"],
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },
  configureWebpack: config => {
    if (isProduction) {
      return Object.assign(productionConfig, webpackConfig);
    }
    return webpackConfig;
  },
  devServer: {
    open: true,
    port: 8086,
    // 代理
    proxy: {
      "/proxyHeader": {
        target: "https://uatwebapi.baigongyi.com/",
        pathRewrite: {
          "^/proxyHeader": "/" // rewrite path
        }
      }
    }
  }
};

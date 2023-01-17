const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer : { 
    port : 8080
  },
  configureWebpack: {
    watch : true,

    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ["buffer", "Buffer"],
      }),
      new NodePolyfillPlugin()

      // new Dotenv(),
    ],
  },
});

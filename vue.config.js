// vue.config.js，如没有此文件则手动创建
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") return;
    // 启用 gzip 压缩插件
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css$/u,
        threshold: 4096, // 超过 4kb 压缩
      })
    );
    config.plugins.push(new BundleAnalyzerPlugin());
  },
  transpileDependencies: ["@dcloudio/uni-ui", "uview-ui"],
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    config.resolve.alias.set("@api", resolve("src/api/"));
    config.resolve.alias.set("@cpt", resolve("src/components/"));
    config.resolve.alias.set("@utl", resolve("src/utils/"));
  },
};

const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');
const {
  override,
  fixBabelImports,
  addWebpackAlias
} = require("customize-cra");

module.exports = override(
  function (config) {
    config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'GenerateSW');
    config.plugins = config.plugins.concat([new InjectManifest({
      importWorkboxFrom: 'disabled',
      swSrc: './src/sw.js',  
      swDest: 'service-worker.js'
    })])
    return config;
  },
  addWebpackAlias({
    images: path.resolve(__dirname, "src/assets/images/"),
    '@ant-design/icons/lib/dist$': path.join(__dirname, 'scripts/icons.js')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
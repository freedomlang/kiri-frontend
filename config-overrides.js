const path = require('path');
const {
  override,
  fixBabelImports,
  adjustWorkbox,
  addWebpackAlias
} = require("customize-cra");

module.exports = override(
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true,
      navigateFallbackBlacklist: [new RegExp('^/dieci')]
      // navigateFallbackDenylist: [new RegExp('^/dieci')]
    })
  ),
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
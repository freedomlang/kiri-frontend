const path = require('path');
const {
  override,
  fixBabelImports,
  addWebpackAlias
} = require("customize-cra");

module.exports = override(
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
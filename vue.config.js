/* = ========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

//const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  publicPath: '/',
  lintOnSave: false,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
  /* configureWebpack: {
    plugins: [
      //new DashboardPlugin()
    ]
  }, */
}

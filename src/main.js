/* = ========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */

import Vue from 'vue'
import './plugins/axios'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' // Material Icons
import 'vuesax/dist/vuesax.css'

// axios
import axios from 'axios'

// Theme Configurations
import '../themeConfig.js'

// Algolia - Instant Search
import InstantSearch from 'vue-instantsearch'

// Firebase
import '@/firebase/firebaseConfig'

// Auth0 Plugin
import AuthPlugin from './plugins/auth'

// ACL
import acl from './acl/acl'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// i18n
import i18n from './i18n/i18n'

// Vuesax Admin Filters
import './filters/filters'

// Clipboard
import VueClipboard from 'vue-clipboard2'

// Tour
import VueTour from 'vue-tour'

// VeeValidate
import VeeValidate from 'vee-validate'

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import './assets/tailwind.css'

// Vuesax
Vue.use(Vuesax)
Vue.prototype.$http = axios
Vue.use(InstantSearch)
Vue.use(AuthPlugin)
Vue.use(VueClipboard)
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')

Vue.use(VeeValidate)
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'YOUR_KEY',
    libraries: 'places' // This is required if you use the Auto complete plug-in
  }
})

// Feather font icon
require('./assets/css/iconfont.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app')

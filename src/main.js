// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import CONFIG from './configs/config'
import * as filters from './js/filters/index' // 全局filter
import httpInterceptor from './libs/httpInterceptor'
import './js/directive' // 全局指令
import '@/assets/css/init.less'
import 'lib-flexible'
import VueI18n from 'vue-i18n' // 国际化语言
import language_CN from './locales/language_CN.js' // 国际化语言 （中文）
import language_EN from './locales/language_EN.js' // 国际化语言 （英文） 
import VConsole from 'vconsole'
import fastClick from "fastclick";

import Vant from 'vant';
import 'vant/lib/index.css';


import config from './service/config'
import api from './service/api'
import native from './service/native'

// import Bridge from './configs/bridge.js'

import common from './service/commin'

Vue.prototype.javascriptBridge = common.setupWebViewJavascriptBridge

// Vue.prototype.$bridge = Bridge

Vue.use(Vant);
new VConsole()

Vue.config.productionTip = false
Vue.config.headers  = 'application/x-www-form-urlencoded; charset=UTF-8'

Vue.prototype.config = config
Vue.prototype.api = api
Vue.prototype.native = native

Vue.use(VueI18n); // 国际化语言
const messages = {
    'en-US': {
        _language: language_EN // 国际化语言 （英文）
    },
    'zh-CN': {
        _language: language_CN // 国际化语言 （中文）
    },
}


// 电脑测试
console.log('---------------- pc test --------------')
 
_init()

function _init() {

    // 国际化语言
    const i18n = new VueI18n({
        locale: store.state.lang || CONFIG.DEFAULT_LANGUAGE, // CONFIG.DEFAULT_LANGUAGE,  // 语言标识 默认中文
        messages
    })

    // 注册全局的过滤器
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })

    // loading效果组件--start
    Vue.prototype.showLoading = function (str) {
        loading.show(str)
    }
    Vue.prototype.hideLoading = function (str) {
        loading.complete()
    }
    Vue.prototype.successLoading = function (str) {
        loading.success(str)
    }
    Vue.prototype.failLoading = function (str) {
        loading.fail(str)
    }
    // loading效果组件--end

    const scrollBehavior = (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }

    /* eslint-disable no-new */
    new Vue({
        router,
        store,
        i18n, // 国际化语言 
        render: h => h(App),
        data: {
            eventHub: new Vue()
        }
    }).$mount('#app')
}
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import api from './tool/api.js';
import router from './tool/router.js'
import tool from './tool/tool.js';
import Components from '@/components/common';
import VueClipBoard from 'vue-clipboard2'
Vue.use(VueClipBoard)
import store from './tool/store.js';
import aes from '@/components/common/aes.js';

import VueUeditorWrap from 'vue-ueditor-wrap';
Vue.use(VueUeditorWrap);

Vue.prototype.$scrollTo = (x = 0, y = 0, type = 'instant') => {
    window.scrollTo({
        top: x,
        left: y,
        behavior: type // 滚动行为：smooth平滑滚动，instant瞬间滚动，默认值auto，等同于instant
    })
}

Vue.use(Components);
Vue.prototype.$tool = tool; //公共工具js
Vue.prototype.$aes = aes; //加密解密js
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$api = api; //引入ajax
Vue.prototype.$store = store; //引入ajax
new Vue({
	store,
	router, //整个应用支持路由。
	render: h => h(App),
}).$mount('#app')
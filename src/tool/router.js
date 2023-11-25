import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//引用组件页面
import login from './../components/login.vue';
import index from './../components/index.vue';

import setting from './../components/setting/setting.vue';

import tool from './tool.js';
import store from './store.js';

//定义routes路由的集合，数组类型
const routes = [
	{
		path: '/',
		name: '首页',
		component: index,
		meta: {
			requireLogin: true
		},
		children: [
			{
				path: '/setting',
				name: '设置',
				component: login
			}
		]
	},
	{
		path: '/login',
		name: '请登录',
		component: login
	}
]



const router = new VueRouter({
	mode: 'history',
	routes
});


router.beforeEach((to, from, next) => {
	var userinfo = tool.GetUserInfo()
	// console.log(userinfo)
	if (to.matched.some(record => record.meta.requireLogin)) { // 判断该路由是否需要登录权限
		if (userinfo) { // 判断当前用户的登录信息是否存在
			document.title = '咕鸽体育运营数据平台_' + to.name
			next();
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		if (to.path == '/') {
			document.title = '咕鸽体育运营数据平台'
		} else {
			document.title = '咕鸽体育运营数据平台_' + to.name
		}
		next();
	}
})

export default router
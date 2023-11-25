import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//引用组件页面
import login from './../components/login.vue';
import index from './../components/index.vue';

import mainindex from './../components/main/mainindex.vue';

import setting from './../components/setting/setting.vue';
import HomestayFacilities from './../components/setting/HomestayFacilities.vue';
import AccommodationRegistration from './../components/WorkOrder/AccommodationRegistration.vue';
import NoticeList from './../components/Notice/NoticeList.vue';
import Partners from './../components/setting/Partners.vue';
import Article from './../components/Article/Article.vue';
import Classification from './../components/Article/Classification.vue';
import GoodsList from './../components/Goods/GoodsList.vue';
import FacilitiesRegistration from './../components/setting/FacilitiesRegistration.vue';
import RealEstateIntermediaryRegistration from './../components/setting/RealEstateIntermediaryRegistration.vue';

import tool from './tool.js';
import store from './store.js';

import NotFound from './../components/plug/NotFound.vue';

//定义routes路由的集合，数组类型
const routes = [{
		path: '/',
		name: '首页',
		component: index,
		meta: {
			requireLogin: true
		},
		children: [
			{
				path: '/AccommodationRegistration',
				name: '住宿登记',
				component: AccommodationRegistration
			},
			{
				path: '/FacilitiesRegistration',
				name: '设施外玄关帐场',
				component: FacilitiesRegistration
			},
			{
				path: '/RealEstateIntermediaryRegistration',
				name: '中介委托',
				component: RealEstateIntermediaryRegistration
			},
			{
				path: '/Article',
				name: '文章管理',
				component: Article
			},
			{
				path: '/Classification',
				name: '分类管理',
				component: Classification
			},
			{
				path: '/GoodsList',
				name: '商品列表',
				component: GoodsList
			},
			{
				path: '/Notice',
				name: '公告列表',
				component: NoticeList
			},
			{
				path: '/HomestayFacilities',
				name: '民宿设施',
				component: HomestayFacilities
			},
			{
				path: '/Partners',
				name: '合作伙伴',
				component: Partners
			},
			{
				path: '/setting/setting',
				name: '系统设置',
				component: setting,
				children: [

				]
			}
		]
	},
	{
		path: '/login',
		name: '请登录',
		component: login
	},
	{
		path: "*",
		name: "NotFound",
		component: NotFound
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
			document.title = '管理后台_' + to.name
			next();
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		if (to.path == '/') {
			document.title = '管理后台'
		} else {
			document.title = '管理后台_' + to.name
		}
		next();
	}
})

export default router
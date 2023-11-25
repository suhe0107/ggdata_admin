import {
	Message,
	MessageBox
} from 'element-ui'
import axios from 'axios'
import router from './router.js';
import aes from '@/components/common/aes.js';
import store from './store.js';

var delay = 1000
var timer = null

const tips = (userinfo) => { //更新用户信息
	return new Promise((resolve, reject) => {
		var that = this
		Message({
			message: userinfo,
			type: 'error',
			duration: 5 * 1000
		})
		resolve(true)
	})
}

const tonewpages = (e) => {
	var that = this
	window.open(e, '_blank')
}


const tokenpasstips = (msg) => { //token过期登录
	login_out()
	Message({
		message: msg,
		type: 'error',
		duration: 5 * 1000
	})
}

const login_out = (msg) => { //退出登录
	var that = this
	store.commit('setUserInfo',null)
	router.push('/login')
}

const debounce = (fn) => {
	return function() {
		const th = this
		var args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(function() {
			timer = null
			// 定时器结束，正常执行函数
			fn.apply(th, args)
		}, delay)
	}
}

const topages = (e) => {
	var that = this
	var aimpages = e
	router.push(aimpages)
}

const GetUserInfo = () => {
	var that = this
	var data = store.state.userinfo
	// console.log(data)
	return (data)
}

const toaes = (type, info) => {
	var that = this
	if (type == 1) {
		return aes.encrypt(JSON.stringify(info))
	}
	if (type == 2) {
		return JSON.parse(aes.decrypt(info))
	}
}

const isMobile = () => {
	const userAgent = window.navigator.userAgent.toLowerCase();
	if (/mobile/i.test(userAgent)) {
		return true;
	}else{
		return false;
	}
}

const ShowPhoneWeb = () => {
	let meta = document.createElement("meta");
	meta.name = "viewport";
	meta.content = "width=device-width,initial-scale=1.0"
	document.head.appendChild(meta);
}

export default {
	tips,
	tonewpages,
	tokenpasstips,
	debounce,
	topages,
	GetUserInfo,
	toaes,
	isMobile,
	ShowPhoneWeb,
	login_out
};
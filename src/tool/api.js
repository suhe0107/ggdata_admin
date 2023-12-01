import axios from 'axios';
import tool from './tool.js';
import store from './store.js';

const instance = axios.create({
	baseURL: 'https://api.suhejishi.com/api/GG', // 接口基础路径
	timeout: 10000 // 超时时间（毫秒）
})

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
	console.log(config)
	var userinfo = tool.GetUserInfo()
	if(config['method']=="post" && userinfo){
		config['headers']['token'] = userinfo.token
	}
	if(!config['data']){
		config['data'] = {}
	}
	if(userinfo){
		config['data']['user_id'] = userinfo.id
	}
	
	return config
}, function(error) {
	return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
	if(response.data.code==501){
		tool.tokenpasstips(response.data.msg)
	}
	return response.data
}, function(error) {
	return Promise.reject(error)
})

// 封装 GET 请求方法
const get = (url, params) => {
	return instance.get(url, {
		params
	})
}

// 封装 POST 请求方法
const post = (url, data) => {
	return instance.post(url, data)
}


export default {
	get,
	post
};
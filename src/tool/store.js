import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex);
const dataPersistence = new VuexPersistence({
	storage: window.localStorage
})
const store = new Vuex.Store({
	state: {
		base_url:'http://139.224.73.124:11082/api/web',
		userinfo: null,
	},
	mutations: {
		setUserInfo(state, payload) {
			state.userinfo = payload
		},
		setBase_Url(state, payload) {
			state.base_url = payload
		},
	},
	actions: {

	},
	modules: {

	},
	plugins: [dataPersistence.plugin]
});

export default store;
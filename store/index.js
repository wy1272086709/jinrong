import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userName: "",
		strategistId: '',
	},
	getters:{
		strategistId: (state) => {
			return state.strategistId
		}
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || 'Admin';
			state.hasLogin = true;
			state.strategistId = ''
		},
		setStrategistId(state, strategistId) {
			state.strategistId = strategistId;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store

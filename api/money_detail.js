import http from '@/common/http.js'

export function getMoneyLogList(sName) {
	const url = getApp().globalData.serverUrl+"/strategys/single_stats";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		sname: sName
	});
	return resp;
}
import http from '@/common/http.js'


export function getSingleStrategyStatData(sName) {
	// 获取策略面板数组
	const url = getApp().globalData.serverUrl+"/strategys/single_stats";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		sname: sName
	});
	return resp;
}
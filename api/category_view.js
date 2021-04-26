import http from '@/common/http.js'
export function getStrategyChildGroupList(groupId, strategistId) {
	const url = getApp().globalData.serverUrl+"/strategys";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		groupId: groupId,
		strategist_id: strategistId
	});
	return resp;
}

export  function getStrategyCategory(cid, status, strategistId) {
	const url = getApp().globalData.serverUrl+"/strategys/category";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		groupId: cid,
		strategist_id: strategistId,
		status: status=== -1?0:status
	});
	return resp;
}

export function getStrategyStats(strategistId, cid, status) {
	const url = getApp().globalData.serverUrl+'/strategys/stats';
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategy_cid: cid,
		strategist_id: strategistId,
		status: status
	});
	return resp;
}
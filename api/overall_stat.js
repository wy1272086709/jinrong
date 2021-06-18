import http from '@/common/http.js';

export function getDaysProfit(strategistId, date_limit) {
	const url = getApp().globalData.serverUrl+"/strategys/profit/yield_curverch";
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		strategist_id: strategistId,
		date_limit: date_limit,
	};
	
	const resp  = http.request(url, params);
	return resp;
}

export function getProfit_cumulative(strategistId,date_limit) {
	const url = getApp().globalData.serverUrl+"/strategys/profit/cumulative_show/earnings";
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		strategist_id: strategistId,
		date_limit: date_limit,
	};
	const resp  = http.request(url, params);
	return resp;
}

// 显示累计收益率
export function getProfitYield(strategistId, date_limit, groupId, cgGroupId) {
	const url = getApp().globalData.serverUrl+"/strategys/profit/cumulative_show/yield";
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		strategist_id: strategistId,
		group_id: groupId,
		cgroup_id: cgGroupId,
		date_limit: date_limit,
	};
	const resp  = http.request(url, params);
	return resp;
}
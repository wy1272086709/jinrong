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
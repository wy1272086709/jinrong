import http from '@/common/http.js'
export function getStrategIstIncome(strategistId, isManual) {
	const url = getApp().globalData.serverUrl+"/strategys/profit/now";
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		strategist_id: strategistId,
		is_manual: isManual,
		filterData: 1
	};
	
	const resp  = http.request(url, params);
	return resp;
}

export function getIncomeSearch(strategistId, sdate, edate) {
	const url = getApp().globalData.serverUrl+"/strategys/profit/search";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategist_id: strategistId,
		datestart: sdate,
		datestop: edate
	});
	return resp;
}

export function getHistoryIncomeList(strategistId, isManual) {
	const url = getApp().globalData.serverUrl+"/strategys/profit/history";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		filterData: 1,
		strategist_id: strategistId,
		is_manual: isManual
	});
	return resp;
}

export function getBondList(strategistId){
	const url = getApp().globalData.serverUrl+"/strategys/profit/deposit";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategist_id: strategistId,
	});
	return resp;
}

export function getCheckUpList(strategistId){
	const url = getApp().globalData.serverUrl+"/strategys/profit/evaluation";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategist_id: strategistId,
	});
	return resp;
}
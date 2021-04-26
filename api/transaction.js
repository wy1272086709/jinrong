import http from '@/common/http.js'
export function getDelegateLogList(strategyId) {
	// condition?history=1
	const url = getApp().globalData.serverUrl+"/strategys/trade_info/condition";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategy_id: strategyId
	});
	return resp;
}

// 历史委托记录
export function getHistoryDelegateLogList(strategyId) {
	const url = getApp().globalData.serverUrl+"/strategys/trade_info/condition?history=1";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategy_id: strategyId
	});
	return resp;
}

// formData 类似于 {
//  type: 'LIMIT',
//  price: '',
//  volume: ''
//}
export function conditionCreate(formData, strategyId) {
	const suffix = '/strategys/condition/create';
	const url = getApp().globalData.serverUrl + suffix;
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		strategy_id: strategyId,
		condition: formData,
		filterData: true,
	}, 'POST', 'application/json');
	return resp;
}

export function conditionUpdate(strategyId, cid, formData) {
	const suffix = '/strategys/condition/update';
	const url = getApp().globalData.serverUrl + suffix;
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		strategy_id: strategyId,
		cid: cid,
		filterData: true,
		condition: formData
	};
	const resp  = http.request(url, params, 'POST', 'application/json');
	return resp;
}

export function conditionDel(strategyId, cid) {
	const suffix = '/strategys/condition_set/remove';
	const url = getApp().globalData.serverUrl + suffix;
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		sid: strategyId,
		id: cid,
		filterData: true,
	};
	const resp  = http.request(url, params);
	return resp;
}


export function conditionPing(strategyId, cid) {
	const suffix = '/strategys/condition_set/close_pos';
	const url = getApp().globalData.serverUrl + suffix;
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		sid: strategyId,
		id: cid,
		filterData: true,
	};
	const resp  = http.request(url, params);
	return resp;
}



export function getVolumeLimit(strategyId) {
	const suffix = '/strategys/condition/open';
	const url = getApp().globalData.serverUrl + suffix;
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		strategy_id: strategyId,
		filterData: true
	}
	const resp  = http.request(url, params);
	return resp;
}

export function statusControl(status, sid) {
	const suffix = '/strategys/trade_operation/';
	const url = getApp().globalData.serverUrl + suffix+ (status?'start': 'stop');
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		sid: sid,
		filterData: true
	}
	const resp  = http.request(url, params);
	return resp;
}
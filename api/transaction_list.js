import http from '@/common/http.js'

export  function getTransactionInfoList(strategistId, status, contract, keyword) {
	const globalData = getApp().globalData;
	const url = globalData.serverUrl+ '/strategys/trade_list';
	const params = {
		strategist_id: strategistId ,
		token: uni.getStorageSync('wx_login_token'),
	}
	if (status !=-1) {
		params.status = status;
	}
	if (contract!= '所有合约' && contract!=-1 && contract!='合约') {
		params.contract = contract;
	}
	if (keyword) {
		params.keyword = keyword;
	}
	const resp =  http.request(url, params);
	return resp;
}
// 一键平空 或者一键平多
export function oneKeyDoneFunc(strategistId, sid, direction) {
	const globalData = getApp().globalData;
	const url = globalData.serverUrl+ '/strategys/trade_operation/close_pos';
	const params = {
		strategist_id: strategistId ,
		token: uni.getStorageSync('wx_login_token'),
		filterData: true
	}
	if (sid) {
		params.sid = sid;
	}
	
	if (direction) {
		params.direction = direction;
	}
	const resp =  http.request(url, params);
	return resp;
}

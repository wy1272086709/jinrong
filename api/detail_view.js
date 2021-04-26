import http from '@/common/http.js'
export function getSingleStrategyStat(sName) {
	const url = getApp().globalData.serverUrl+"/strategys/single_stats";
	const token = uni.getStorageSync('wx_login_token');
	const resp = http.request(url, {
		token: token,
		sname: sName,
	})
	return resp;
}

export function getStrategyTransactionList(sName, page, searchParams) {
	const url = getApp().globalData.serverUrl+"/strategys/transaction_list";
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token: token,
		sname: sName,
		page: page,
		filterData: true,
	}
	if (searchParams.offset_direction!==undefined &&searchParams.offset_direction) {
		params.offset_direction = searchParams.offset_direction
	}
	if (searchParams.datestart) {
		params.datestart = searchParams.datestart
	}
	if (searchParams.datestop) {
		params.datestop = searchParams.datestop
	}
	const resp  = http.request(url, params)
	return resp;
};
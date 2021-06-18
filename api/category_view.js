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

// isCgroupId 为false 时候,cid 对应的是groupId
// isCgroupId 为true 的时候,cid对应的是cgroup_id
export  function getStrategyCategory(cid, status, strategistId, isCgroupId) {
	const url = getApp().globalData.serverUrl+"/strategys/category";
	const token = uni.getStorageSync('wx_login_token');
	const params =  {
		token: token,
		strategist_id: strategistId,
		status: status=== -1?0:status
	}
	if (!isCgroupId) {
		params.groupId = cid;
	}
	else if (isCgroupId) {
		params.cgroup_id = cid
	}
	const resp  = http.request(url,params);
	return resp;
}

export function getCgrouplist(groupId, strategistId) {
	const url = getApp().globalData.serverUrl+"/strategys/cgrouplist";
	const token = uni.getStorageSync('wx_login_token');
	const resp  = http.request(url, {
		token: token,
		group_id: groupId,
		strategist_id: strategistId
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
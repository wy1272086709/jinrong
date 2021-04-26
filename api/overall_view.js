import http from '@/common/http.js';

export function getOverallStat()  {
	const info = {
		
	};
	return info;
}
	// 策略分类列表
export async function getStrategyGroupList(pageNo, pageSize, strategistId)  {
	// 获取策略面板数组
	const apiPrefix = getApp().globalData.serverUrl;
	const url = apiPrefix +"/strategys/overall_stats";
	const token = uni.getStorageSync('wx_login_token');
	const params = {
		token
	}
	if (strategistId ) {
		params.strategist_id = strategistId;
	}
	const resp = await http.request(url, params);
	const rows = resp.category;
	const len  = rows.length;
	const keys = ['', '']; 
	const res = [];
	for(let m = 0;m<len; m++) {
		//let newRow = getNeedKeys(row);
		const newrow = rows[m];
		res[m] = newRow;
	}
	console.log('resp:'+JSON.stringify(resp));
	return { 
		res: res,
		totalpage: Math.ceil(len/pageSize)
	};
}

function getNeedKeys(keys, row) {
	const newRow = {};
	keys.map((key) => {
		newRow[key] = row[key];
	});
	return newRow;
}
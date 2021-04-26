export function getLimitPriceList(pageNo, pageSize) {
	
	
}

export function getStopLossList(pageNo, pageSize) {
	const info = {
		nid: 1,
		conditionName: '止损单',
		status: 1,// 卖出平多, 平/空
		quality: 0.05,
		price:  37134.07,
	}
	let list = [];
	for (let m = 1;m<=100;m++) {
		const newInfo = {};
		Object.assign(newInfo,  {...info}, {nid: m});
		list.push(newInfo);
	}
	const offset = (pageNo - 1) * pageSize;
	const offsetEnd = (pageNo) * pageSize;
	const res = list.slice(offset, offsetEnd);
	console.log('res'+JSON.stringify(res));
	return {
		list: res,
		totalpage: Math.ceil(list.length/pageSize)
	}
}
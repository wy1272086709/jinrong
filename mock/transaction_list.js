export function getContractList() {
	return [
		{ label: 'ALL', value: 0 },
		{ label: 'BTC永续', value: 1 },
		{ label: 'LTC永续', value: 2 },
		{ label: 'ETH永续', value: 3 },
		{ label: 'XRP永续', value: 4 },
	]
}

export function getStatusList() {
	return [
		{ label: '所有状态', value: -1 },
		{ label: '运行中', value: 2 },
		{ label: '暂停', value: 1 },
		{ label: '已停止', value: 4 },
	]
}

export function getTransactionInfoList(pageNo, pageSize) {
	const info = {
		strategyInfo: {
				sName: 'N5_S-2018-01 ethusdt.OKEX',
				status: 1,
				strategyGroupName: '人工_YZQ',
		},
		// 交易信息,比如仓位信息,
		stategyTrasactionInfo: {
			// 胜率
			winRatio: 60.9,
			// 累计收益
			accumulatedIncome: 1026,
			// 累计收益率
			accumulatedIncomeRatio: 102,
			totalStorings: 0.5,
			kaiduoStorings: 0.04,
			kaikongStrorings: 0,
			kaiduoPrice: 36271,
			kaikongPrice: 0,
		},
	};
	
	const list = [];
	for (let i = 1;i<=100;i++) {
		const newInfo = {};
		Object.assign(newInfo, {...info}, { nid: i });
		list.push(newInfo)
	}
	const offset = (pageNo - 1) * pageSize;
	const offsetEnd = (pageNo) * pageSize;
	const res = list.slice(offset, offsetEnd);
	console.log('list'+JSON.stringify(res));
	return { 
		list: res,
		totalpage: Math.ceil(list.length/pageSize)
	};
}
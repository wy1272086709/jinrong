// 策略组ID
export function getStrategyGroupInfo(groupId) {
	return {
		title: '双周期趋势捕捉',
		author: '袁中强',
		remark: '策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,策略简介,'
	}
}

export function getStrategyList(pageNo, pageSize) {
	const list = [
		{
			title: 'N2 双周期趋势捕捉',
			isGroupName: true,
			status: 1,
		},
		{
			title: 'N5_S-2018-01 btcusdt.HUOBI',
			nid: 1,
			status: 1, // 已过期
		},
		{	
			title: 'N5_S-2018-01 btcusdt.HUOBI',
			total_amount_val: 1314.22,
			nid: 2,
			status: 2,
			accumulated_income: 52.63,
			cumulative_rate: 52.33,
			nearly_week: -13.20,
			nearly_month: 23.50,
			transaction_info: {
				offset: '空',
				position: 0,
				profit_loss: '',
			},
		},
		{
			title: 'N5_S-2018-01 btcusdt.BINANCE',
			nid: 3,
			status: 2, //运行中
			total_amount_val: 1314.22,
			accumulated_income: 52.63,
			cumulative_rate: 52.33,
			nearly_week: -13.20,
			nearly_month: 23.50,
			transaction_info: {
				offset: '空',
				position: 0,
				profit_loss: '',
			},
		},
		{
			title: 'N5_S-2018-01 ethusdt.OKEX',
			status: 2, //运行中
			nid: 4,
			total_amount_val: 1314.22111,
			accumulated_income: 52.63,
			cumulative_rate: 52.33,
			nearly_week: -13.20,
			nearly_month: 23.50,
			transaction_info: {
				offset: '空',
				position: 0,
				profit_loss: '',
			},
		},
		{
			title: 'N5_S-2018-01 ethusdt.OKEX',
			status: 2, //运行中
			nid: 5,
			total_amount_val: 1314.22,
			accumulated_income: 52.63,
			cumulative_rate: 52.33,
			nearly_week: -13.20,
			nearly_month: 23.50,
			transaction_info: {
				offset: '空',
				position: 0,
				profit_loss: '',
			},
		},
		{
			title: 'N5_S-2018-01 ethusdt.OKEX',
			status: 2, //运行中
			nid: 6,
			total_amount_val: 1314.22,
			accumulated_income: 52.63,
			cumulative_rate: 52.33,
			nearly_week: -13.20,
			nearly_month: 23.50,
			transaction_info: {
				offset: '空',
				position: 0,
				profit_loss: '',
			},
		},
		{
			title: 'N5_S-2018-01 ethusdt.OKEX',
			status: 2, //运行中
			nid: 7,
			total_amount_val: 1314.22,
			accumulated_income: 52.63,
			cumulative_rate: 52.33,
			nearly_week: -13.20,
			nearly_month: 23.50,
			transaction_info: {
				offset: '空',
				position: 0,
				profit_loss: '',
			},
		}
	];
	const offset = (pageNo - 1) * pageSize;
	const offsetEnd = (pageNo) * pageSize;
	const res = list.slice(offset, offsetEnd);
	console.log('list'+JSON.stringify(res));
	return { 
		list: res,
		totalpage: Math.ceil(list.length/pageSize)
	};
}

// 获取币对
export function getCurrrcyPairs() {
	return [
		/*{
			label: 'BTCUSDT', value: 1,
		},
		{
			label: 'ETHUSDT', value: 2,
		},
		{
			label: 'XRPUSD', value: 3,
		}*/
	];
}

// 获取运行状态
export function getRunningStatus() {
	return [
		{
			label: '所有状态', value: -1,
		},
		{
			label: '运行中', value: 2,
		}, 
		{
			label: '暂停',   value: 1,
		}
	];
}


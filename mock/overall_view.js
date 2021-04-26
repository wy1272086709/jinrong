export function getOverallStat()  {
	const info = {
		
	};
	return info;
}
	// 策略分类列表
export function getStrategyGroupList(pageNo, pageSize, strategistId)  {
		const list = [
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 1 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 2 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 3 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 4 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 5 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 6 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 7 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 8 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 9 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 10 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 11 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 12 },
			{ name: '双周期趋势捕捉', author: '袁中强', cumulative_rate:'+10261',  cumulative_month_rate: '+102', id: 13 }
		];
		const offset = (pageNo - 1) * pageSize;
		const offsetEnd = (pageNo) * pageSize;
		const res = list.slice(offset, offsetEnd);
		console.log('list'+JSON.stringify(res));
		return { 
			res: res,
			totalpage: Math.ceil(list.length/pageSize)
		};
}
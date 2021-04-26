export function getMoneyLogList(pageNo, pageSize) {
	const list = [
		{
			nid: 1,
			date: '2020/12/21',
			withdraw_money: '+10000',
			real_money: '60000'
		},
		{
			nid: 2,
			date: '2020/12/11',
			withdraw_money: '-10000',
			real_money: '40000'
		},
		{
			nid: 3,
			date: '2020/12/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 4,
			date: '2020/11/21',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 5,
			date: '2020/11/11',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 6,
			date: '2020/11/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 7,
			date: '2020/10/21',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 8,
			date: '2020/10/11',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 9,
			date: '2020/10/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 10,
			date: '2020/09/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 11,
			date: '2020/08/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 12,
			date: '2020/07/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 13,
			date: '2020/06/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
		{
			nid: 14,
			date: '2020/05/01',
			withdraw_money: '+10000',
			real_money: '40000'
		},
	];
	const offset = (pageNo - 1) * pageSize;
	const offsetEnd = (pageNo) * pageSize;
	const res = list.slice(offset, offsetEnd);
	console.log('list'+JSON.stringify(res));
	return { 
		list: res,
		totalpage: Math.ceil(list.length/pageSize)
	};
	return list;
}
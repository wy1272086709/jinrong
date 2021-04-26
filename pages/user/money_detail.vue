<template>
	<view id="root-view">
		
		<view id="root-view-header">
			<u-sticky>
			<u-tabs :list="[{name: '交易账单'}, {name: '收益详情'}, {name: '资金明细'}]" active-color="#333" inactive-color="#999999" bg-color="#F2F2F2" item-width="250"  bar-height="3" :current="2" @change="clickSwithTab"></u-tabs>
			</u-sticky>
		</view>
		
		<scroll-view :scroll-y="true" :style="{height: scrollHeight}">
			<view id="root-view-top">
				<view id="root-view-money">
					<view v-for="(item, index) in moneyList" :key="item.nid" class="money-view" >
						<view class="money-label">{{item.label}}</view>
						<view :class="[ (index==2&&item.num>=0)?'green-css': (index==2 &&item.num<0)?'red-css':'' ]">{{item.num}}</view>
					</view>
				</view>
			</view>
			
			<view id="root-view-middle">
				<text>资金回撤/追投明细</text>
			</view>
		
			<view id="root-view-bottom" >
				<u-empty v-if="tableData.length == 0"  :margin-top="marginTop"></u-empty>
				
				<view v-for="row in tableData" :key="row.nid" class="root-view-row">
					<view class="root-view-row-1">
						<view class="left-view bold-title-text">{{row.money>0?'追投资金':'撤回资金'}}</view>
						<view class="right-view" :class="row.money>0?'green-css': 'red-css'">{{row.money>0?'+':''}}{{row.money}}</view>
					</view>
					<view class="root-view-row-2 light-font">
						<view class="left-view">{{row.created_at}}</view>
						<view class="right-view">
							<text style="margin-right: 10rpx;">变更后: </text>
							<text>{{row.end_capital}}</text>
						</view>
					</view>
				</view>
				
				<!-- 加载更多... -->
				<u-loadmore :status="status" v-if="tableData.length>0"></u-loadmore>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let pageNo = 1, totalpage = 1;
	//import { getMoneyLogList } from '../../mock/money_detail.js';
	import { getMoneyLogList } from '@/api/money_detail.js';
	export default {
		data() {
			return {
				strategyInfo: {
					
				},
				scrollHeight: '',
				tableData: [],
				width: '',
				height: '',
				marginTop: '',
				moneyList: [
					
				],
				status: 'nomore',
			}
		},
		computed:{
			statusColor() {
				const status = this.strategyInfo.status;
				return status==2?'color:rgba(38,214,80,1)':(status == 1?'color:#ec9217':(status ==4?'color:rgba(254,65,87,1)':'color:#7CFC00'));
			},
			statusText() {
				const status = this.strategyInfo.status;
				return status==2?'运行中':(status == 1?'暂停': (status == 4?'已停止':'已过期'));
			}
		},
		async onLoad(option) {
			const info = uni.getSystemInfoSync();
			const w = info.windowWidth;
			const h = info.windowHeight;
			this.height = h -195 - 60+'px';
			const ratio = parseFloat(750/w).toFixed(4);
			//const res = getMoneyLogList(1, 10);
			let sName = option.sName;
			this.sName = sName;
			this.marginTop = (h*ratio - 320 - 180)/2
			this.scrollHeight = h - uni.upx2px(80) - uni.upx2px(3)*2- uni.upx2px(3/2)*2+'px';
			if (!this.sName) return;
			const res = await getMoneyLogList(sName);
			this.strategyInfo = {
				sName: sName,
				status: res.status
			};
			this.moneyList = [
				{ label: '初始资金', num: res.initial_capital, nid: 1 },
				{ label: '当前资金', num: res.total_amount, nid: 1 },
			]
			console.log('this.moneyList:'+JSON.stringify(this.moneyList));
			const moneyList = res.capital_adjust.detail;
			const n = moneyList.length;
			const newMoneyList = [];
			for( let m =0;m<n;m++) {
				let row = this.formatMoneyLog(moneyList[m]);
				newMoneyList.push(row);
			}
			this.tableData = newMoneyList;
		},
		onReachBottom() {
			setTimeout(()=> {
				if (pageNo>totalpage) {
					this.status = 'nomore';
					return;
				}
				//this.status = 'loading';
				pageNo++;
			}, 500);
		},
		methods: {
			// 
			clickSwithTab(index) {
				
			},
			formatMoneyLog(info) {
				return info
			}
		}
	}
</script>

<style lang="scss">
#root-view {
	display: flex;
	flex-direction: column;
	width: 750rpx;
	min-height: 100vh;
	position: fixed;
	background-color: #FFFFFF;
	&-top {
		display: flex;
		flex-direction: column;
		/*margin-top:20px;*/
		background-color: #FFFFFF;
		border-radius: 40rpx;
		padding-top:20rpx;
		/*padding-bottom:20px;*/
		&-1 {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			padding-left:32rpx;
			padding-right: 32rpx;
			.sname-css {
				font-weight: 800;
				font-size: 20rpx;
			}
		}
		#root-view-money {
			display: flex;
			width: 686rpx;
			text-align: center;
			margin-left: 32rpx;
			margin-right: 32rpx; 
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			background-color: #FFFFFF;
			.money-view {
				display: flex;
				flex-direction: column;
				flex: 1;
				text-align: left;
				align-items: flex-start;
				color: #A9A9A9;
				> view:nth-child(1) {
					margin-bottom: 20rpx;
				}
				> view:nth-child(2) {
					font-size:46rpx;
					font-weight: 800;
				}
				.money-label {
					font-weight: 300;
				}
			}
			
		}
	}
	
	&-middle {
		display: flex;
		font-weight: 800;
		margin-top: 10px;
		padding-bottom: 11px;
		padding-left: 16px;
		border-bottom: 1px solid #F2F2F2;
	}
	
	&-bottom {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		padding-bottom: 20px;
		#root-view-header {
			display: flex;
			margin-top: 20px;
			font-weight: 600;
			margin-bottom: 20px;
			> view {
				flex: 1;
				text-align: center;
			}
		}
		.root-view-row {
			display: flex;
			margin-bottom: 30px;
			padding-left: 32rpx;
			padding-right: 32rpx;
			flex-direction: column;
			padding-top:20rpx;
			/*padding-bottom: 20rpx;*/
			border-bottom: 1px solid #CCC;
			&-1 {
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;
			}
			&-2 {
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;
			}
		}
	}
}

.green-css {
	color:rgba(38,214,80,1);
	font-weight: 800;
}
.light-font {
	color: #999;
}
.bold-title-text {
	font-weight: 800;
	font-size: 32rpx;
}
.red-css {
	color:rgba(254,65,87,1);
	font-weight: 800;
}
</style>

<template>
	<!--
	<view id="root-view">
		<view id="root-view-header">
			<u-sticky>
			<u-tabs :list="[{name: '交易账单'}, {name: '收益详情'}, {name: '资金明细'}]" active-color="#333" inactive-color="#999999" bg-color="#F2F2F2" item-width="250"  bar-height="3" :current="2" @change="clickSwithTab"></u-tabs>
			</u-sticky>
		</view>
		-->
		<scroll-view :scroll-y="true" :style="{height: scrollHeight}" class="root-view">
			<view class="list">
			<view class="root-view-top">
				<view class="root-view-money">
					<view v-for="(item, index) in moneyList" :key="item.nid" class="money-view" >
						<view class="money-label">{{item.label}}</view>
						<view :class="[ (index==3&&item.num>=0)?'green-css': (index==3 &&item.num<0)?'red-css':'' ]">{{item.num}}</view>
					</view>
				</view>
			</view>
			
			<view class="root-view-middle">
				<text>资金回撤/追投明细</text>
			</view>
		
			<view class="root-view-bottom" >
				<u-empty v-if="tableData.length == 0"  :margin-top="marginTop"></u-empty>
				
				<view v-for="row in tableData" :key="row.nid" class="root-view-row">
					<view class="root-view-row-1">
						<view class="left-view common-font color-3">{{row.money>0?'追投资金':'撤回资金'}}</view>
						<view class="right-view" :class="row.money>0?'blue-css': 'red-css'">{{row.money>0?'+':''}}{{row.money}}</view>
					</view>
					<view class="root-view-row-2 light-font">
						<view class="left-view common-font1 color-1">{{row.created_at}}</view>
						<view class="right-view">
							<text style="margin-right: 10rpx;" class="color-2 common-font1">变更后实际资金: </text>
							<text class="color-3 common-font1">{{row.end_capital}}</text>
						</view>
					</view>
				</view>
				
				<!-- 加载更多... -->
				<u-loadmore :status="status" v-if="tableData.length>0" bg-color="#333333"></u-loadmore>
			</view>
			</view>
		</scroll-view>
		<!--
	</view>
	-->
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
		props: {
			sName: {
				type: String,
				default: ''
			}
		},
		computed:{
			
		},
		watch:{
			sName: async function(nval, oval) {
				console.log('watch:'+oval)
				console.log('watch:'+nval)
				if (!nval) return;
				console.log(nval)
				const res = await getMoneyLogList(this.sName);
				this.moneyList = [
					{ label: '初始资金', num: res.initial_capital, nid: 1 },
					{ label: '当前资金', num: res.total_amount, nid: 2 },
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
			}
		},
		beforeDestroy() {
			console.log('component destory...')
		},
		async created() {
			const info = uni.getSystemInfoSync();
			const w = info.windowWidth;
			const h = info.windowHeight;
			this.height = h -195 - 60+'px';
			console.log('info3:'+JSON.stringify(info))
			const ratio = parseFloat(750/w).toFixed(4);
			this.marginTop = (h*ratio - 320 - 180)/2
			this.isIphoneX = getApp().globalData.isIphoneX
			const iphoneXPadding = this.isIphoneX?uni.upx2px(68):0
			console.log('iphoneXPadding3:'+iphoneXPadding)
			this.scrollHeight = h - uni.upx2px(80) - iphoneXPadding - uni.upx2px(3)- 3+'px';
			// #ifdef APP-PLUS || H5
			if (!this.sName) return;
			const res = await getMoneyLogList(this.sName);
			this.moneyList = [
				{ label: '初始资金', num: res.initial_capital, nid: 1 },
				{ label: '当前资金', num: res.total_amount, nid: 2 },
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
			// #endif
		},
		onReachBottom() {
			setTimeout(()=> {
				if (pageNo>totalpage) {
					this.status = 'nomore';
					return;
				}
				//this.status = 'loading';
				pageNo++;
				const res = getMoneyLogList(pageNo, 10);
				const list= res.list;
				if (list.length>0) {
					this.tableData = this.tableData.concat(list);
				}
			}, 500);
		},
		methods: {
			clickSwithTab(index) {
				
			},
			formatMoneyLog(info) {
				return info
			}
		}
	}
</script>

<style lang="scss">
	.list {
	    padding-bottom: 0;  
	    padding-bottom: constant(safe-area-inset-bottom);  
	    padding-bottom: env(safe-area-inset-bottom);  
	}
.root-view {
	background-color:rgba($color: #333, $alpha: 1.0);
	&-top {
		display: flex;
		flex-direction: column;
		/*margin-top:20px;*/
		
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
		.root-view-money {
			display: flex;
			width: 686rpx;
			text-align: center;
			margin-left: 32rpx;
			margin-right: 32rpx; 
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			background-color:rgba($color: #333333, $alpha: 1.0);
			.money-view {
				display: flex;
				flex-direction: column;
				flex: 1;
				text-align: center;
				align-items: center;
				
				> view:nth-child(1) {
					margin-bottom: 20rpx;
					color: #FFFFFF;
				}
				> view:nth-child(2) {
					font-size:46rpx;
				}
				.money-label {
					font-weight: 400;
					color: #B1B7BC;
				}
			}
			
		}
	}
	
	&-middle {
		display: flex;
		font-weight: 800;
		margin-top: 10px;
		padding-bottom: 58rpx;
		padding-left: 16px;
		border-bottom: 1px solid rgba($color: #FFFFFF, $alpha: 0.3);
	}
	
	&-bottom {
		display: flex;
		flex-direction: column;
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
			/*border-bottom: 1px solid #CCC;*/
			border: 1px solid rgba($color: #FFFFFF, $alpha: 0.3);
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
	color:#00c087;
	font-weight: 800;
}
.blue-css {
	color: $kp-blue-color;
}
.light-font {
	color: #999;
}
.common-font {
	font-size: 28rpx;
	font-family: SimHei;
	font-weight: 400;
}

.common-font1 {
	font-size: 22rpx;
	font-family: SimHei;
	font-weight: 400;
	
	
}
// 日期,
.color-1 {
	color: rgba($color: #FFFFFF, $alpha: 0.6);
}
// 变更后... 这一段文本
.color-2 {
	color: #C3C3C3;
}

// 追投资金和变更后，资金对应的数字
.color-3 {
	color: #FFFFFF;
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

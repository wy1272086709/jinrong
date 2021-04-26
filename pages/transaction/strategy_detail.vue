<template>
	<view class="box-view">
		<u-sticky>
		<u-tabs :list="[{name: '交易账单'}, {name: '收益详情'}, {name: '资金明细'}]" active-color="#333" inactive-color="#999999" bg-color="#F2F2F2" item-width="250"  bar-height="3" :current="0" @change="clickSwithTab"></u-tabs>
		
		
		<view id="sticky-u-view">
			<view id="header-view">
				<view id="status-view" @tap.stop="showStatusView">
					<text>{{title1}}</text>
					<u-icon name="arrow-down" size="20" style="margin-left:5px;"></u-icon>
				</view>
				<view class="date-select flex-center" @tap="startDateOpen">
					<text>{{sDateText}}</text>
					<u-icon name="arrow-down" size="20" style="margin-left:5px;"></u-icon>
				</view>
				<view class="date-select flex-center" @tap="startDateOpen">
					<text>{{eDateText}}</text>
					<u-icon name="arrow-down" size="20" style="margin-left:5px;"></u-icon>
				</view>
			<!-- 历史操作... -->
			</view>
		</view>
		</u-sticky>
	
		<scroll-view :scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="lower">
		<view class="wrap-box-view">
			<view id="history-table-view">
	<!-- 1:平多(红色),2:做多(绿色),3:平空(绿色),4:做空(红色) -->
				<view id="history-content" >
					<view v-for="info in history_data" class="history-content-row" :key="info.id">
						<view class="history-content-row-1">
							<view class="left-view">
								<text>{{info.statusTxt}}</text>
							</view>
							<view class="">
								<text class="right-view-time">{{info.year+"/"+info.date+" "+info.minute}}</text>
							</view>
						</view>
						<view class="history-content-row-2">
							<view class="left-view">
								<text class="label-text" space="nbsp">数量:   </text>
								<text>{{info.sum_volume}}</text>
							</view>
							<view class="light-font">
								<text class="label-text right-view-label">收益:   </text>
								<text :class="info.benifits>=0?'green-color':'red-color'">{{info.benifits}}</text>
							</view>
						</view>
						<view class="history-content-row-3">
							<view class="left-view">
								<text class="label-text" space="nbsp">成交价格:   </text>
								<text>{{info.avg_price}}</text>
							</view>
							<view class="light-font">
								<text class="label-text right-view-label">收益率:   </text>
								<text :class="info.margins>=0?'green-color':'red-color'">{{info.margins+'%'}}</text>
							</view>
						</view>
					</view>
					<u-loadmore status="nomore" v-if="isShowDx"></u-loadmore>
				</view>
			</view>
		</view>
		
		</scroll-view>
		<w-picker
			:visible.sync="rangeVisible"
			mode="range" 
			:startYear="startYear" 
			:endYear="endYear"
			:value="rangeVal"
			:current="true"
			@confirm="onConfirm($event,'range')"
			@cancel="onCancel"
			theme-color="#2979FF"
			ref="range" 
		></w-picker>
		<u-select :default-value="[ index ]" v-model="showStatus" mode="single-column" :list="options1" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import {  getSingleStrategyStatData } from '@/api/strategy_detail.js';
	import { getStrategyTransactionList  } from '@/api/detail_view.js';
	
	let nowpage = 1;
	let totalpage = 1;
	export default {
		data() {
			return {
				basicInfoList: [
					{ name: 'initial_capital', val: '' },
					{ name: 'total_amount', val: '' },
					{ name: 'leverage', val: '' },
					{ name: 'contract', val: '' },
					{ name: 'contract_multiplier', val: '' },
					{ name: 'exchange', val: '' },
					{ name: 'swap_exchange', val: '' }
				],
				history_data: [
					
				],
				sDateText: '开始日期',
				eDateText: '结束日期',
				winRatio: 0,
				index: 0,
				title1: '所有操作',
				options1: [
					{ label: '所有' , value: 0 },
					{ label: '平多' , value: 1 },
					{ label: '平空', value: 3 },
					{ label: '资金费', value: 4 }
				],
				value1: 0,
				rangeVisible: false,
				startYear: '',
				endYear: '',
				rangeVal: '',
				isShowDx: false,
				showStatus: false,
				scrollHeight: '',
			}
		},
		async onLoad(option) {
			const sName = option.sName;
			this.sName = sName;
			const d = new Date
			this.endYear  =  d.getFullYear()
			this.startYear= parseInt(this.endYear) -2
			const info = uni.getSystemInfoSync()
			this.scrollHeight = info.windowHeight - uni.upx2px(80) - 41- uni.upx2px(3)*2- uni.upx2px(3/2)*2+'px';
			this.rangeVal = [ this.getMonthFirstDay(),  this.getTodayDay() ];
			const data  = await getSingleStrategyStatData(sName);
			this.basicInfoList[0].val = data.initial_capital;
			this.basicInfoList[1].val = data.total_amount;
			this.basicInfoList[2].val = data.leverage;
			this.basicInfoList[3].val = data.swap_exchange.trading;
			this.basicInfoList[4].val = data.contract_multiplier;
			this.basicInfoList[5].val = data.swap_exchange.exchange;
			this.basicInfoList[6].val = data.swap_exchange.currency;
			console.log('data.profit_loss'+JSON.stringify(data.profit_loss));
			if (data.profit_loss && data.profit_loss.rate!==undefined) {
				this.winRatio = data.profit_loss.rate;
			} else {
				this.winRatio = 0;
			}
			this.initHistoryLogList(this.sName);
			
			console.log('winRatio:'+this.winRatio);
		},
		methods: {
			onCancel() {
				
			},
			clickSwithTab(index) {
				if (index == 0) {
					return;
				} else {
					const sName = this.sName
					if (index == 1) {
						// 跳转到收益详情
						uni.redirectTo({
							url: '/pages/user/income_detail?sName='+sName
						})
					}
					else if(index == 2) {
						// 跳转到资金明细
						uni.redirectTo({
							url: '/pages/user/money_detail?sName='+sName
						})
					}
				}
			},
			async initHistoryLogList(sName) {
				const start = this.sDateText=='开始日期'? '': this.sDateText
				const end = this.eDateText=='结束日期'? '': this.eDateText
				const direction = (this.title1  == '所有操作' || this.title1 == '所有')?'':this.title1 
				let searchParams = {
					offset_direction: direction,
					datestart: start,
					datestop: end,
				};
				const res = await getStrategyTransactionList(sName,1, searchParams);
				console.log('res:'+JSON.stringify(res))
				if (res.status == 1) {
					this.history_data = res.data;
					totalpage = res.totalPage;
				} else {
					this.history_data = [];
				}
				nowpage = 1;
				if (nowpage>=totalpage) {
					this.isShowDx =  true
					return;
				} else {
					this.isShowDx =  false
				}
			},
			getMonthFirstDay() {
				const date = new Date(); //前一天
				const seperator1 = "-";
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				const currentdate = year + seperator1 + month + seperator1 + '01';
				return currentdate;
			},
			getTodayDay() {
				const date = new Date(); //前一天
				const seperator1 = "-";
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				const d = date.getDate()
				const currentdate = year + seperator1 + month + seperator1 + (d>10?d:'0'+d);
				return currentdate;
			},
			startDateOpen() {
				this.rangeVisible = true
			},
			showStatusView() {
				this.showStatus = !this.showStatus
			},
			confirm(e) {
				console.log(e)
				this.title1 = e[0].label
				this.statusRow = e[0]
				const index = this.options1.findIndex((item) => {
					return item.value == e[0].value
				});
				console.log('index:'+index)
				this.index = index;
				this.initHistoryLogList(this.sName);
			},
			onConfirm(e) {
				this.sDateText = e.value[0];
				this.eDateText = e.value[1];
				this.initHistoryLogList(this.sName);
			},
			fixedChange() {
				
			},
			unfixedChange() {
				
			},
			lower() {
				console.log('nowpage', nowpage, 'totalPage', totalpage);
				console.log('reach bottom:');
				if (nowpage>=totalpage) {
					this.isShowDx =  true
					return;
				} 
				uni.showLoading({
					title:"加载中.."
				})
				setTimeout(async () => {
					nowpage++;
					const start = this.sDateText=='开始日期'? '': this.sDateText
					const end = this.eDateText=='结束日期'? '': this.eDateText
					const direction = (this.title1  == '所有操作' || this.title1 == '所有') ?'':this.title1 
					let searchParams = {
						offset_direction: direction,
						datestart: start,
						datestop: end,
					};
					const res = await getStrategyTransactionList(this.sName, nowpage, searchParams);
					if (res.status == 1) {
						this.history_data = this.history_data.concat(res.data);
					}
					uni.hideLoading();
				}, 500);
			}
		},
		onReachBottom() {
			console.log('nowpage', nowpage, 'totalPage', totalpage);
			console.log('reach bottom:');
			if (nowpage>=totalpage) {
				this.isShowDx =  true
				return;
			} 
			uni.showLoading({
				title:"加载中.."
			})
			setTimeout(async () => {
				nowpage++;
				const start = this.sDateText=='开始日期'? '': this.sDateText
				const end = this.eDateText=='结束日期'? '': this.eDateText
				const direction = (this.title1  == '所有操作'|| this.title1=='所有')?'':this.title1 
				let searchParams = {
					offset_direction: direction,
					datestart: start,
					datestop: end,
				};
				const res = await getStrategyTransactionList(this.sName, nowpage, searchParams);
				if (res.status == 1) {
					this.history_data = this.history_data.concat(res.data);
				}
				uni.hideLoading();
			}, 500);
		}
	}
</script>

<style lang="scss">
	::-webkit-scrollbar {
			width: 0;
			height: 0;
			display: none;
			color:transparent;
		}
.basic-info {
	margin-top:20px;
	font-weight: bolder;
	/*border-bottom: 1px solid #969696;*/
	margin-bottom:10px;
}

.history-row-year {
	font-weight: 800;
	margin-left: 16px;
	margin-top: 10px;
	margin-bottom: 10px;
}
#sticky-u-view {
	border-bottom: 1px solid #F2F2F2;
	background-color: #FFFFFF;
}
.box-view {
	width: 750rpx;
	border-radius: 40px;
	::v-deep .u-sticky {
		background-color: #FFFFFF;
	}
	::v-deep .u-sticky-wrap {
		
	}
	.basic-info-border {
		margin-top:20px;
		margin-left: 5px;
		padding-bottom: 10px;
		font-weight: 800;
		//border-bottom: 1px solid #969696;
	}
	
	#basic-info-list {
		margin-top:10px;
		color: #999999;
		background-color: #F2F2F2;
		border-radius: 20rpx;
		display: flex;
		flex-direction: row;
		#basic-info-left {
			width:50%;
			view {
				margin-top:10px;
				margin-bottom: 10px;
				padding-left:5px;
			}
			flex-direction: column;
		}
		#basic-info-right {
			width:50%;
			flex-direction: column;
			view {
				margin-top:10px;
				margin-bottom: 10px;
				padding-left:5px;
			}
		}
	}
}

.transaction-log {
	margin-right: 24rpx;
}

.green-css {
	color:rgba(38,214,80,1);
}

.red-css {
	color:rgba(254,65,87,1);
}


#history-content {
	display: flex;
	/*margin-left:20rpx;
	margin-right:20rpx;*/
	flex-direction: column;
	margin-top: 23rpx;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	padding-bottom: 0;  
	padding-bottom: constant(safe-area-inset-bottom);  
	padding-bottom: env(safe-area-inset-bottom);  
}


.history-content-row {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 32rpx;
	padding-top: 32rpx;
	border-bottom: 1px solid #F2F2F2;
	padding-left: 32rpx;
	padding-right: 32rpx;
	&-1 {
		display: flex;
	}
	&-2 {
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	&-3 {
		display: flex;
	}
	&-4 {
		display: flex;
	}
}

.history-row-year {
	font-weight: 800;
	margin-left: 16px;
	margin-top: 10px;
	margin-bottom: 10px;
}

.history-row-data {
	display: flex;
}

.history-row-data>view {
	display: flex;
	flex-direction: column;
	flex-basis:107.66rpx;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
}

.history-common-date {
	color: #CCC;
	font-size: 24rpx;
}

.light-font {
	color: #282828;
}



#income-details-view {
	margin-top:20px;
	justify-content: center;
}

.income-details-underline {
	margin-left:10px;
	text-decoration: underline;
	color: rgba(0,114,239,1);
}

.history-common-text-class {
	font-size:24rpx;
	font-family:Source Han Sans CN;
	font-weight:bold;
	color:rgba(101,101,101,1);
}

.dx_view {
	height:40rpx;
	display: flex;
	justify-content: center;
}
.dx_view::before{
	position:relative;
	content: "";
	height: 1px;
	top:50%;
	border-top:1px solid rgba(179,179,179,1);
	width: 257rpx;
}

.dx_view::after {
	border-top:1px solid rgba(179,179,179,1);
	position:relative;
	content: "";
	height: 1px;
	top:50%;
	width: 257rpx;
}

.dx_class {
	height:40rpx;
	align-items: center;
	width: 170rpx;
}
.dx_class>text {
	color: rgba(179,179,179,1);
	font-size: 24rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
}


.data-label {
	color: #CCC;
	font-size: 24rpx;
}

.date-select {
	width: 262.5rpx;
	color: #999999;
	font-size: 24rpx;
	display: flex;
	align-items: center;
	
}

#header-view {
	display: flex;
	background-color: #FFFFFF;
	/*position: fixed;*/
	height: 40px;
	/*z-index: 4;*/
	/*z-index: 1;*/
}
.right-view-label {
	/*margin-left: 100rpx;*/
}
.flex-center {
	justify-content: center;
}

.flex-end {
	justify-content: flex-end;
}

#status-view {
	display: flex;
	width: 276rpx;
	z-index: 2;
	align-items: center;
	justify-content: center;
	color: #999999;
	::v-deep .u-dropdown__menu__item__text {
		color: #999999;
	}
}
.left-view {
	width: 50%;
	color: #282828;
	display: flex;
}

.title-view{
	display: flex;
	justify-content:space-between;
	color: #ffffff;
	background-color: #ff0033;
	display: flex;
}

.right-view {
	width: 50%;
	display: flex;
	justify-content: flex-end;
	color: #B5B5B5;
	&-time {
		color: #282828;
	}
}
.green-color {
	color: #12D0A0;
	font-weight: 500;
}
.red-color {
	color: #FF5A5A;
	font-weight: 500;
}
.label-text {
	margin-right: 10rpx;
}

</style>

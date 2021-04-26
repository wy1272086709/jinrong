<template>
	<view id="root-view">
		<u-sticky>
			<u-tabs :list="[{name: '交易账单'}, {name: '收益详情'}, {name: '资金明细'}]" active-color="#FFF" inactive-color="rgba(255, 255, 255, 0.5)" bg-color="#333" item-width="250"  bar-height="3" :current="activeTabIndex" @change="clickSwithTab"></u-tabs>	
			
			<view id="header-view" v-if="activeTabIndex == 0">
				
					<view id="status-view" @tap.stop="showStatusView">
						<text>{{title1}}</text>
						<u-icon name="arrow-down" size="20" style="margin-left: 10rpx;"></u-icon>
					</view>
					
					<view class="date-select flex-center" @tap="startDateOpen">
						<text>{{sDateText}}</text>
						<u-icon name="arrow-down" size="20" style="margin-left: 10rpx;"></u-icon>
					</view>
					
					<view class="date-select flex-center flex-1" @tap="startDateOpen">	
						<text>{{eDateText}}</text>
						<u-icon name="arrow-down" size="20" style="margin-left: 10rpx;"></u-icon>
					</view>
				<!-- 历史操作... -->
				
			</view>
		</u-sticky>
		
		<swiper :scroll-with-animation="true"   :is-scroll="true" :current="activeTabIndex" @change="switchPage" class="swiper" :style="{height: swiperHeight}">
			<swiper-item>
				<strategy-detail  :sName="sName" :dataList="dataList" @lower="lower" :isShowDxFlag="isShowDxFlag"></strategy-detail>
			</swiper-item>
			<swiper-item style="background-color: #333333;">
				<income-detail :sName="sName"></income-detail>
			</swiper-item>
			<swiper-item style="background-color: #333333;">
				<money-detail  :sName="sName"></money-detail>
			</swiper-item>
		</swiper>
		<template v-if="activeTabIndex == 0">
			<w-picker
				:visible.sync="rangeVisible"
				mode="range" 
				:startYear="startYear" 
				:endYear="endYear"
				:value="rangeVal"
				:current="true"
				@confirm="onConfirm($event,'range')"
				@cancel="onCancel"
				theme-color="#FFFFFF"
				ref="range" 
				:header-style="{ backgroundColor: '#333333', color: '#FFFFFF' }"
			></w-picker>
			<u-select :default-value="[ index ]" v-model="showStatus" mode="single-column" :list="options1" @confirm="confirm" confirm-color="#FFFFFF"></u-select>
		</template>
	</view>
</template>

<script>
	import strategyDetail from '@/common/strategy_detail.vue'
	import incomeDetail from '@/common/income_detail.vue'
	import moneyDetail from '@/common/money_detail.vue'
	import { getStrategyTransactionList  } from '@/api/detail_view.js';
	let totalpage = 1;
	let nowpage = 1;
	export default {
		components: {
			strategyDetail,
			incomeDetail,
			moneyDetail
		},
		data() {
			return {
				activeTabIndex: 0,
				title1: '所有操作',
				sDateText: '开始日期',
				eDateText: '结束日期',
				index: 0,
				rangeVisible: false,
				startYear: '',
				endYear: '',
				swiperHeight: '',
				dataList: [],
				currencyPair: '',
				isShowDxFlag: false,
				options1: [
					{ label: '所有' , value: 0 },
					{ label: '买入开多' , value: 1 },
					{ label: '卖出开空', value: 3 },
					{ label: '买入平空', value: 4 },
					{ label: '卖出平多', value: 5 },
					{ label: '资金费', value: 6 }
				],
				showStatus: false,
				sName: '',
				rangeVal: [],
			};
		},
		onLoad(option) {
			this.sName = option.sName
			this.currencyPair = option.cname
			const info = uni.getSystemInfoSync()
			if (this.activeTabIndex == 0) {
				this.swiperHeight = info.windowHeight - uni.upx2px(80) - 3 - 40-  uni.upx2px(3) + 'px'
			} else if (this.activeTabIndex == 1) {
				this.swiperHeight = info.windowHeight - uni.upx2px(80) - 3 - uni.upx2px(3) + 'px'
			} else if(this.activeTabIndex == 2) {
				this.swiperHeight = info.windowHeight - uni.upx2px(80) - 3 -  uni.upx2px(3) + 'px'
			}
			console.log(option)
			const d = new Date
			this.endYear  =  d.getFullYear()
			this.startYear= parseInt(this.endYear) -2
			this.rangeVal = [ this.getMonthFirstDay(),  this.getTodayDay() ];
			if (this.activeTabIndex == 0) {
				this.initHistoryLogList(this.sName)
			}
			const titleArr = [ '交易账单', '收益详情', '资金明细' ]
			const title = titleArr[this.activeTabIndex]
			uni.setNavigationBarTitle({
				title: title
			})
			console.log('this.rangeVal:'+JSON.stringify(this.rangeVal))
		},
		methods: {
			onCancel() {
				
			},
			lower() {
				console.log('nowpage', nowpage, 'totalPage', totalpage);
				console.log('reach bottom:');
				if (nowpage>=totalpage) {
					this.isShowDxFlag =  true
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
						this.dataList = this.dataList.concat(res.data);
					}
					uni.hideLoading();
				}, 500);
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
			clickSwithTab(index) {
				this.activeTabIndex = index
				const titleArr = [ '交易账单', '收益详情', '资金明细' ]
				const title = titleArr[index]
				uni.setNavigationBarTitle({
					title: title
				})
				this.resizeHeight(index)
			},
			switchPage(e) {
				const thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
				console.log('thisCurr', thisCurr);
				if(thisCurr == this.activeTabIndex) {
					return;
				}
				this.activeTabIndex = thisCurr
				this.resizeHeight(thisCurr)
			},
			resizeHeight(index) {
				const info = uni.getSystemInfoSync()
				console.log(info)
				this.isIphoneX = getApp().globalData.isIphoneX
				const iphoneXPadding = this.isIphoneX?uni.upx2px(68):0
				
				if (index == 0) {
					console.log('thisCurr0')
					this.swiperHeight = info.windowHeight -  iphoneXPadding - uni.upx2px(80) - 40- uni.upx2px(3)- 3+'px'
				}
				else if (index == 1) {
					console.log('thisCurr1')
					this.swiperHeight = info.windowHeight -  iphoneXPadding - uni.upx2px(80) - uni.upx2px(3)- 3+'px'
				} else if(index == 2){
					console.log('thisCurr2')
					this.swiperHeight = info.windowHeight -  iphoneXPadding - uni.upx2px(80) - uni.upx2px(3)- 3+'px'
				}
				console.log('swiperHeight:'+this.swiperHeight)
			},
			startDateOpen() {
				this.rangeVisible = true
			},
			showStatusView() {
				this.showStatus = !this.showStatus
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
				console.log('init historyLog list')
				const res = await getStrategyTransactionList(sName,1, searchParams);
				console.log('res:'+JSON.stringify(res))
				if (res.status == 1) {
					this.dataList = res.data;
					totalpage = res.totalPage;
				} else {
					this.dataList = [];
				}
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
				this.initHistoryLogList(this.sName)
			},
			onConfirm(e) {
				this.sDateText = e.value[0];
				this.eDateText = e.value[1];
				this.initHistoryLogList(this.sName)
			}
		}
	}
</script>

<style lang="scss">
#header-view {
	display: flex;
	background-color: #3D3F43;
	height: 40px;
	/*border-bottom:1px solid #F2F2F2;*/
}
.right-view-label {
	/*margin-left: 100rpx;*/
}
.flex-1 {
	display: flex;
	flex: 1;
}
scroll-view {
	-webkit-overflow-scrolling: touch;
	background-color: $kp-bg-color;
	color: $kp-font-color;
}

::v-deep .u-tabs {
	border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.5);
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

#root-view {
	height: 100vh;
	background-color: $kp-bg-color;
	::v-deep .u-table {
		background-color: #333333 !important;
		display: flex;
		flex-direction: column;
	}
	::v-deep .u-th {
		background-color: #333333 !important;
		height: 56rpx !important;
	}
	
	::v-deep .u-td {
		font-size: 24rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	
	::v-deep .u-select {
		background: #333;
	}

	
	::v-deep .uni-picker-view-mask {
		
	}
	
	::v-deep .my-black-mask {
		background-image: linear-gradient(
		180deg
		, #333, rgba(255, 255, 255, 0.1)),linear-gradient(
		0deg
		,#333, rgba(255, 255, 255, 0.1));
	}
	
	::v-deep .my-indicator-class {
		background-color: rgba($color: #FFFFFF, $alpha: 0.1);
	}
	
	::v-deep .my-datepicker-mask {
		background-image: linear-gradient(
		180deg
		, #333, rgba(255, 255, 255, 0.1)),linear-gradient(
		0deg
		,#333, rgba(255, 255, 255, 0.1));
	}

	::v-deep .w-picker-view {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	
	::v-deep .u-select__body__picker-view {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	
	::v-deep .u-select__body__picker-view__item {
		background-color: $kp-bg-color;
		color: $kp-font-color;
	}
	
	::v-deep .uni-picker-view-indicator {
		color: $kp-font-color;
	}
	
	::v-deep .uni-picker-view-indicator:after {
		border-bottom: 1px solid rbga(#FFFFFF, 0.1);
		
	}
	
	::v-deep .uni-picker-view-indicator:before {
		border-bottom: 1px solid rbga(#FFFFFF, 0.1);
	}
	
	::v-deep .w-picker-cnt {
		background: rgba(255, 255, 255, 0.1);
	}
	
	::v-deep .w-picker-header {
		border-width: 0px;
		//background-color: rgba(255, 255, 255, 0.1) !important;
	}
}

</style>

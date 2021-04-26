<template>
	<view id="root-view">
		<u-tabs-swiper bg-color="#333333" activeColor="#ffffff"  item-width="250"  bar-height="3" inactiveColor="#b1b7bc" ref="tabs" :list="[{name: '历史委托'}, {name: '交易账单'}]" :current="activeTabIndex" @change="clickSwithTab" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
	
		<swiper :style="{height: swiperHeight}" :current="activeTabIndex" @transition="transition" @animationfinish="animationfinish" @change="change">
			<swiper-item>
			<scroll-view  :scroll-y="true" :style="{height: scrollheight}">
					<delegate-component-item :bold-text="item.cname" v-for="item in historyDelegateLogList" :key="item.id" :delegate-info="item" delegate-type="history_list"  has-slot="1" :delegate-label="item.cname">
						<!-- <view class="delegate-row-1">
							<view class="delegate-row-1-cname">
								<text class="bold-text" style="margin-right: 10rpx;">{{currencyPairs}}</text>
								<text class="bold-text">{{item.cname}}</text>
							</view>
						</view> -->
						<view class="delegate-row-1" style="margin-top: 10rpx;margin-bottom: 10rpx;">
							<view class="header-left">
								<!-- <view style="margin-right: 22rpx;">
									<u-tag :text="item.description"  :bg-color="item.description.indexOf('平空')!==-1 || item.description.indexOf('开多')!==-1? '#00C087':'#ED3F5D'"
									:color="'#FFFFFF'" size="mini" border-color="transparent"  plain></u-tag>
								</view> -->
								<view class="juzhong u-m-l-20">
									<image v-if="item.description.indexOf('开多')!==-1" style="width:40rpx ;height: 40rpx;" src="../../static/image/overall_view/duo.png"></image>
									<image v-if="item.description.indexOf('开空')!==-1" style="width:40rpx ;height: 40rpx;" src="../../static/image/overall_view/kong.png"></image>
								</view>
								<view class="u-m-l-20 u-font-26">
									<text :style="item.description.indexOf('开多')!==-1?'color:#24F5FD':'color:#FB3F69'">{{item.description}}</text>
								</view>
								<view class="u-m-l-20 u-font-21">
									<text class="bold1-text">{{item.cname}}</text>
								</view>
							</view>
							<view class="right-view-time pre-text u-font-20">
								{{item.opening_at.substr(0, 16)}}
							</view>
						</view>
					</delegate-component-item>
			
					<u-loadmore status="nomore" bg-color="#333333"  v-if="historyDelegateLogList.length>0"></u-loadmore>
					<!-- :margin-top="marginTop" -->
					<u-empty v-if="historyDelegateLogList.length == 0"  text="暂无历史委托记录"></u-empty>
				
			</scroll-view>
		</swiper-item>
		<swiper-item>
			<scroll-view :scroll-y="true">
			<view id="sticky-u-view">
				<view id="header-view">
					<view id="status-view" @tap.stop="showStatusView">
						<text>{{title1}}</text>
						<u-icon name="arrow-down" size="20" style="margin-left:5px;"></u-icon>
					</view>
					<view class="date-select flex-center" @tap.stop="startDateOpen">
						<text>{{sDateText}}</text>
						<u-icon name="arrow-down" size="20" style="margin-left:5px;"></u-icon>
					</view>
					<view class="date-select flex-center" @tap.stop="startDateOpen">
						<text>{{eDateText}}</text>
						<u-icon name="arrow-down" size="20" style="margin-left:5px;"></u-icon>
					</view>
				<!-- 历史操作... -->
				</view>
			</view>
			
			<scroll-view  :scroll-y="true" @scrolltolower="lower" :style="{height: scrollheight1}">
				<view>
							<view v-for="info in history_data" class="history-content-row" :key="info.id" v-if="history_data.length>0">
								<view class="history-content-row-1">
									<view class="left-view">
										
			
										<view class="margin-css">
											<!-- <u-tag :text="info.statusTxt" :bg-color="info.statusTxt.indexOf('平空')!==-1 || info.statusTxt.indexOf('开多')!==-1? '#00C087':'#ED3F5D'"
											:color="'#FFFFFF'" size="mini" border-color="transparent"  plain></u-tag> -->
											<text :style="info.statusTxt.indexOf('买入')!==-1?'color:#24F5FD':'color:#FB3F69'">{{info.statusTxt}}</text>
										</view>
									</view>
									<view class="right-view">
										<text class="right-view-time u-font-20">{{info.year+"/"+info.date+" "+info.minute}}</text>
									</view>
								</view>
								
								
								
								<view class="history-content-row-2">
									<view class="left-view">
										<text class="label-text" space="nbsp">数量</text>
										<text class="u-m-l-40">{{info.sum_volume}}</text>
									</view>
									<!-- light-font -->
									<view class="right-view ">
										<text class="label-text" space="nbsp">成交价格</text>
										<text class="u-m-l-40">{{info.avg_price}}</text>
									</view>
								</view>
								<u-gap height="2" bg-color="rgba(255,255,255,0.1)"></u-gap>
								<view class="history-content-row-3">
									<view class="left-view">
										<text class="label-text">收益</text>
										<text v-if="info.benifits > 0" class="u-m-l-40 green-color">{{info.benifits}}</text>
										<text v-if="info.benifits == 0" class="u-m-l-40">{{info.benifits}}</text>
										<text v-if="info.benifits < 0" class="u-m-l-40 red-color">{{info.benifits}}</text>
									</view>
									<view class="right-view right-space">
										<text v-if="info.margins>0" class="u-m-l-40 green-color">{{info.margins+'%'}}</text>
										<text v-if="info.margins==0" class="u-m-l-40 font-color">{{info.margins+'%'}}</text>
										<text v-if="info.margins<0" class="u-m-l-40 red-color">{{info.margins+'%'}}</text>
										<view class="u-m-r-30 juzhong">
											<image v-if="info.margins < 0" style="width: 28rpx;height: 32rpx;" src="../../static/image/overall_view/next.png"></image>
											
											<image v-if="info.margins > 0" style="width: 28rpx;height: 32rpx;" src="../../static/image/overall_view/prev.png"></image>
										</view>
									</view>
										
								</view>
							</view>
							
							<!--
							<view class="dx_view" v-if="isShowDx">
								<view  class="dx_class">
									<text>我是有底线的</text>
								</view>
							</view>
							-->
							<u-loadmore color="rgba(255,255,255,0.1)" marginTop="20" margin-bottom="20" bg-color="#333" :status="historyStatus" v-if="history_data.length>0"></u-loadmore>
				</view>
				<u-empty v-if="history_data.length == 0"
				text="暂无交易账单"></u-empty>
			</scroll-view>
		
			</scroll-view>
		</swiper-item>
		</swiper>
			<template v-if="activeTabIndex == 1">
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
					:header-style="{ backgroundColor: '#333333', color: '#FFFFFF' }"
					ref="range" 
				></w-picker>
				<u-select :default-value="[ index ]" v-model="showStatus" mode="single-column" :list="options1" @confirm="confirm" confirm-color="#FFFFFF"></u-select>
			
		</template>
	</view>
</template>

<script>
	import { getHistoryDelegateLogList } from '@/api/transaction.js'
	import {  getSingleStrategyStatData } from '@/api/strategy_detail.js';
	import { getStrategyTransactionList  } from '@/api/detail_view.js';
	import delegateComponentItem from '@/components/delegate-component-item.vue';
	let totalpage = 1;
	let nowpage = 1;
	export default {
		data() {
			return {
				activeTabIndex: 0,
				historyDelegateLogList: [
					
				],
				scrollheight: '',
				scrollheight1: '',
				history_data: [],
				marginTop: '100',
				historyStatus: 'loadmore',
				sDateText: '开始日期',
				eDateText: '结束日期',
				winRatio: 0,
				index: 0,
				isIphoneX: false,
				title1: '所有操作',
				currencyPairs: '',
				options1: [
					{ label: '所有' , value: 0 },
					{ label: '买入开多' , value: 1 },
					{ label: '卖出开空', value: 3 },
					{ label: '买入平空', value: 4 },
					{ label: '卖出平多', value: 5 },
					{ label: '资金费', value: 6 }
				],
				value1: 0,
				rangeVisible: false,
				startYear: '',
				swiperHeight: '',
				endYear: '',
				rangeVal: '',
				isShowDx: false,
				showStatus: false,
			}
		},
		components: {
			delegateComponentItem
		},
		async onLoad(option) {
			this.sName = option.sName;
			this.sid = option.sid;
			const info = uni.getSystemInfoSync();
			console.log(this.historyDelegateLogList)
			const w = info.windowWidth
			const h = info.windowHeight
			let radio  = 750 / w
			console.log('radio'+radio)
			this.isIphoneX = getApp().globalData.isIphoneX
			this.currencyPairs = option.currencyPairs
			const iphoneXPadding = this.isIphoneX?uni.upx2px(68):0
			const v = 40 + uni.upx2px(80) + uni.upx2px(3) + 5
			this.scrollheight = h - uni.upx2px(80)-uni.upx2px(3)- 5 - iphoneXPadding +'px'
			this.scrollheight1 = h - v  - iphoneXPadding + 'px'
			this.swiperHeight =  h - 41+'px';
			this.marginTop = parseFloat((info.windowHeight - v - 90)/2* radio).toFixed(2)
			console.log('marginTop',this.marginTop)
			const d = new Date
			this.endYear  =  d.getFullYear()
			this.startYear= parseInt(this.endYear) -2
			this.rangeVal = [ this.getMonthFirstDay(),  this.getTodayDay() ];
			const data  = await getSingleStrategyStatData(this.sName);
			this.winRatio = data.profit_loss!== undefined ? data.profit_loss.rate : '0'
			try {
			this.historyDelegateLogList = await getHistoryDelegateLogList(this.sid);
			this.initHistoryLogList(this.sName)
			} catch(e) {
				this.historyDelegateLogList = []
			}
		},
		onReachBottom() {
			if (this.activeTabIndex == 0) return;
			console.log('nowpage', nowpage, 'totalPage', totalpage);
			console.log('reach bottom:');
			if (nowpage>=totalpage) {
				this.isShowDx =  true
				this.historyStatus = 'nomore'
				return;
			} 
			
			uni.showLoading({
				title:"加载中.."
			})
			setTimeout(async () => {
				this.historyStatus = 'loadmore'
				if (this.activeTabIndex == 1) {
					nowpage++;
					const start = this.sDateText=='开始日期'? '': this.sDateText
					const end = this.eDateText=='结束日期'? '': this.eDateText
					const direction = this.title1  == '所有操作'?'':this.title1 
					let searchParams = {
						offset_direction: direction,
						datestart: start,
						datestop: end,
					};
					const res = await getStrategyTransactionList(this.sName, nowpage, searchParams);
					if (res.status == 1) {
						this.history_data = this.history_data.concat(res.data);
					}
				} else if (this.activeTabIndex == 0) {
					
				}
				uni.hideLoading();
			}, 500);
		},
		methods: {
			lower() {
				if (this.activeTabIndex == 0) return;
				console.log('nowpage', nowpage, 'totalPage', totalpage);
				console.log('reach bottom:');
				if (nowpage>=totalpage) {
					this.isShowDx =  true
					this.historyStatus = 'nomore'
					return;
				} 
				
				uni.showLoading({
					title:"加载中.."
				})
				setTimeout(async () => {
					this.historyStatus = 'loadmore'
					if (this.activeTabIndex == 1) {
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
					} else if (this.activeTabIndex == 0) {
						
					}
					uni.hideLoading();
				}, 500);
			},
			async clickSwithTab(index) {
				this.switchTabFunc(index)
			},
			// tab栏切换
			change(index) {
				//this.switchTabFunc(index)
				//this.activeTabIndex = index;
			},
			async switchTabFunc(index) {
				// 刷新列表数据
				if (index != this.activeTabIndex) {
					if (index == 1) {
						this.activeTabIndex = index
						await this.initHistoryLogList(this.sName)
					} else if (index == 0) {
						this.activeTabIndex = index
						try {
							this.historyDelegateLogList = await getHistoryDelegateLogList(this.sid);
						} catch(e) {
							console.log(e)
							this.historyDelegateLogList = []
						}
					}
				}
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.switchTabFunc(current)
				//this.activeTabIndex = current;
			},
			transition({ detail: { dx } }) {
				console.log(dx)
				this.$refs.tabs.setDx(dx);				
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
				const direction = (this.title1  == '所有操作'|| this.title1=='所有')?'':this.title1 
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
			onCancel(e) {
				
			},
			
		}
	}
</script>

<style lang="scss">
#root-view {
	min-height: 100vh;
	background-color: #333333;
	::v-deep .u-sticky-wrap {
		/*border-bottom: 1px solid #F2F2F2;*/
		
	}
	::v-deep .u-tabs {
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}
	::v-deep .u-tag{
		font-size: 24rpx;
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
	
	/*::v-deep .uni-picker-view-indicator:after {
		border-bottom: 1px solid rbga(#FFFFFF, 0.1);
		
	}
	
	::v-deep .uni-picker-view-indicator:before {
		border-bottom: 1px solid rbga(#FFFFFF, 0.1);
	}*/
	
	::v-deep .w-picker-cnt {
		background: rgba(255, 255, 255, 0.1);
	}
	
	::v-deep .w-picker-header {
		border-width: 0px;
	}
}
::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
		color:transparent;
	}
.header-view {
	background-color: #333333;
	display: flex;
	padding-top:20rpx;
	padding-bottom: 20rpx;
	&-row-1 {
		display: flex;
		width: 100%;
		padding-left: 32rpx;
		padding-right: 32rpx;
		justify-content: space-between;
		>view:nth-child(1) {
			font-size: 22rpx;
			width: 550rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
		}
		&-title {
			font-weight: 700;
			padding-top: 20rpx;
		}
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

#header-view {
	display: flex;
	background-color: #333333;
	/*position: fixed;*/
	height: 40px;
	/*z-index: 4;*/
	/*z-index: 1;*/
}

.flex-center {
	justify-content: center;
}

.flex-end {
	justify-content: flex-end;
}

#status-view {
	display: flex;
	width: 225rpx;
	z-index: 2;
	align-items: center;
	justify-content: center;
	color: #999999;
	::v-deep .u-dropdown__menu__item__text {
		color: #999999;
	}
}



.history-content-row {
	margin-top: 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	// padding-bottom: 32rpx;
	
	padding-left: 32rpx;
	padding-right: 32rpx;
	&-1 {
		display: flex;
		justify-content: space-between;
		height: 74rpx;
		background-color: rgba(255,255,255,0.1);
		border-radius: 8rpx;
	}
	&-2 {
		margin: 20rpx 0 20rpx 0;
		display: flex;
		padding-top: 10rpx;
		padding-bottom: 0px;
	}
	&-3 {
		display: flex;
		margin: 20rpx 0 20rpx 0;
	}
	&-4 {
		margin: 20rpx 0 20rpx 0;
		display: flex;
		
	}
}

#sticky-u-view {
	border-bottom: 1px solid rgba(255,255,255,0.1);
	background-color: #333333;
}

.green-class {
	color: rgb(0, 192, 135);
	font-size: 22rpx;
}


.delegate-row-1 {
	display: flex;
	margin-top: 20rpx;
	flex-direction: row;
	align-items: center;
	height: 74rpx;
	background-color: rgba($color: #ffffff, $alpha: 0.1);
	border-radius: 8rpx;
	.header-left{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 65%;
	}
}
.bold-text {
	font-size: 32rpx;
	font-weight: 800;
}
.bold1-text{
	font-size: 24rpx;
	font-weight: 800;
	color: rgba(255,255,255,0.5);
}
.delegate-row-1-cname {
	margin-right: 26rpx;
}

.left-text-1 {
	display: flex;
	width: 60%;
}

.right-text-1 {
	display: flex;
	
	width: 40%;
	>view:nth-child(1) {
		display: flex;
		justify-content: flex-end;
	}
}
.delegate-row-1-date {
	flex-direction: column;
	
}

.left-view {
	width: 55%;
	color: rgba($color: #c3c3c3, $alpha: 0.96);
	display: flex;
	margin-left: 20rpx;
}
.right-space{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.right-view {
	width: 45%;
	display: flex;
	color: rgba($color: #ffffff, $alpha: 0.96);
	&-time {
		display: flex;
		align-items: center;
		color: #999;
	}
}
.light-font {
	color: #B5B5B5;
}
.font-color{
	color: rgba(195,195,195,0.96);
}
.green-color {
	color: #24F5FD;
	font-weight: 500;
}
.green-bgc {
	background-color: rgb(0, 192, 135);
	padding-left:5rpx;
	padding-right:5rpx;
	color: #FFFFFF;
}
.red-bgc {
	background-color: rgb(237, 63, 93);
	padding-left:5rpx;
	padding-right:5rpx;
	color: #FFFFFF;
}
.red-color {
	color: #FF3F6A;
	font-weight: 500;
}
.label-text {
	margin-right: 10rpx;
}
.margin-css {
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}

.list {  
    padding-bottom: 0;  
    padding-bottom: constant(safe-area-inset-bottom);  
    padding-bottom: env(safe-area-inset-bottom);  
}  

</style>

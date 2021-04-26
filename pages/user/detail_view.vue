<template>
	<view  id="root-view">
	
		<view id="header-view">
			<view id="status-view" @tap.stop="showStatusView">
				<text>{{title1}}</text>
				<u-icon name="arrow-down-fill" size="10" style="margin-left:5px;"></u-icon>
			</view>
			<view class="date-select flex-center" @tap="startDateOpen">
				<text>{{sDateText}}</text>
				<u-icon name="arrow-down-fill" size="10" style="margin-left:5px;"></u-icon>
			</view>
			<view class="date-select" @tap="startDateOpen">
				<text>{{eDateText}}</text>
				<u-icon name="arrow-down-fill" size="10" style="margin-left:5px;"></u-icon>
			</view>
		<!-- 历史操作... -->
		</view>
		
		
			<!-- @touchstart="startEvent" @touchend="endEvent" :style="'height:'+scrollHeight+'px;'" :scroll-y="true" @scrolltolower="lower" -->
		<view class="wrap-box-view">
			<view id="history-table-view">
		<!-- 1:平多(红色),2:做多(绿色),3:平空(绿色),4:做空(红色) -->
					<view id="history-content"  >
						<view  v-for="info,index in history_data" class="history-content-row"  :key="index">
							<view class="history-row-data">
								<view class="flex-start-css" style="align-items: flex-start;margin-right: 5rpx;">
									<view>
										<text class="history-common-date">{{info.year+"/"+info.date}}</text>
									</view>
									<view>
										<text class="history-common-date">{{info.minute}}</text>
									</view>
								</view>
								<view>
									<text :style="(info.statusTxt.indexOf('平空')!==-1 || info.statusTxt.indexOf('开多')!==-1) ? 'background:#E1FBF3;color:#00C087': 'background:#FFF0EB;color:#FF6C47' " class="status-btn ">{{ info.statusTxt }}</text>
								</view>
								<view>
									<text class="history-common-text-class">{{info.avg_price}}</text>
									<text class="data-label">成交价</text>
								</view>
								<view>
									<text class="history-common-text-class">{{info.sum_volume}}</text>
									<text class="data-label">交易量</text>
								</view>
								<view>
									<text class="history-common-text-class">{{info.benifits}}</text>
									<text class="data-label">利润</text>
								</view>
								<view>
									<text class="history-common-text-class">{{info.margins}}%</text>
									<text class="data-label">利润比</text>
								</view>
							</view>
						</view>
						<view class="dx_view" v-if="isShowDx">
						<view  class="dx_class">
							<text>我是有底线的</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<w-picker
			:visible.sync="rangeVisible"
			mode="range" 
			:startYear="startYear" 
			:endYear="endYear"
			:value="rangeVal"
			:current="true"
			@confirm="onConfirm($event,'range')"
			@cancel="onCancel"
			ref="range" 
		></w-picker>
	
		<!--
		<view class="mask" :style="showStatus?'opacity:1':'display:none'" @tap.stop="closeMask">
			<view :show="showStatus"  :style="styles">
				<view class="warp" @tap.stop>
					<view class="rect">
						<view v-for="item in options1" :key="item.value">
							<view>{{item.label}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		-->
		<u-select :default-value="[ index ]" v-model="showStatus" mode="single-column" :list="options1" @confirm="confirm"></u-select>
	</view>
</template>


<script>
	let pageNo = 1;
	let pageSize = 10;
	let nowpage = 1;
	let totalpage = 1;
	let sName = '';
	let interval = null;
	let globalOption = {};
	import http from '../../common/http.js';
	import strategyComponentItem from '@/common/strategy-component-item.vue';
	import { getSingleStrategyStat, getStrategyTransactionList  } from '@/api/detail_view.js';
	//import { getStrategyHistoryList  } from '@/mock/detail_view.js';
	export default {
		components: {
			strategyComponentItem,
			
		},
		onPullDownRefresh() {
			// 下拉刷新
			//this.getSingleStrategyStatData(globalOption.sName);
			//this.getTrasactionList(globalOption.sName, pageNo);
			//uni.stopPullDownRefresh();
		},
		computed: {
			zIndex: function() {
				return this.dropdownIndex!==''?99:3;
			}
		},
		mounted() {
			const systemInfo = uni.getSystemInfoSync();
			// px转换到rpx的比例
			let pxToRpxScale = 750 / systemInfo.windowWidth;
			this.lineHeight =  systemInfo.statusBarHeight * pxToRpxScale + 'rpx';
			this.headerHeight = 44 * pxToRpxScale;
			this.headerViewHeight = systemInfo.statusBarHeight * pxToRpxScale + 44 * pxToRpxScale+ 'rpx';
			//this.marginTop = this.headerHeight+56+systemInfo.statusBarHeight * pxToRpxScale;
			this.contentHeight =  systemInfo.windowHeight - 42;
		},
		data() {
			return {
				index: 0,
				dropdownIndex: '',
				headerViewHeight: '',
				rangeVisible: false,
				startYear: '',
				endYear: '',
				styles: '',
				headerHeight: 0,
				scrollHeight: '',
				isOpenEyes: 1,
				lineHeight: 0,
				value1: 0,
				show: false,
				showStatus: false,
				rangeVal: [],
				statusRow: {},
				value: 0,
				sDateText: '开始日期',
				eDateText: '结束日期',
				//marginTop:'56',
				isShowDx: false,
				contentHeight: '',
				//category: {},
				options1: [
					{ label: '所有操作' , value: 0 },
					{ label: '平多' , value: 1 },
					{ label: '开多', value: 2 },
					{ label: '平空', value: 3 },
					{ label: '开空', value: 4 }
				],
				value1: 0,
				title1: '所有操作',
				strategyViewData: {
					// 总金额(元)
					total_amount: "",
					// 累计收益（元）
					accumulated_income: "",
					//累计收益率
					cumulative_rate: "",
					// 近一周
					nearly_week: "",
					// 近一月
					nearly_month: "",
				},
				transaction_info: {
					offset:"",
					position:"",
					profit_loss:""
				},
				history_data: [
					
				],
				tabMarginTop: '',
			}
		},
		async onLoad(option) {
			console.log('option');
			this.setIosBackground();
			pageNo = nowpage = totalpage = 1;
			let info = uni.getSystemInfoSync();
			let w = info.windowWidth;
			let h = info.windowHeight;
			let radio = 750/w;
			const sName = option.sName;
			this.sName = sName;
			//this.category = await getSingleStrategyStat(sName);
			//console.log('this.category'+JSON.stringify(this.category));
			this.initHistoryLogList(this.sName);
			const d = new Date
			this.endYear  =  d.getFullYear()
			this.startYear= parseInt(this.endYear) -2
			this.scrollHeight = h - 50 -10
			this.rangeVal = [ this.getMonthFirstDay(),  this.getTodayDay() ];
		},
		onHide() {
			if(interval) {
				clearTimeout(interval);
			}
		},
		
		onReachBottom() {
			//加载第二页
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
				uni.hideLoading();
			}, 500);
		},
		methods: {
			async initHistoryLogList(sName) {
				const start = this.sDateText=='开始日期'? '': this.sDateText
				const end = this.eDateText=='结束日期'? '': this.eDateText
				const direction = this.title1  == '所有操作'?'':this.title1 
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
			openDropdown(index) {
				this.dropdownIndex = index;
			},
			showStatusView() {
				this.showStatus = !this.showStatus
				/*const translateY = this.showStatus ? 0 : '-100%';
				const customStyle = "transform: translateY("+translateY+")";
				this.styles = "background:rgba(0, 0, 0, 0.5);position:absolute;top:15px;"+customStyle;*/
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
			onCancel() {
				
			},
			lower() {
				//加载第二页
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
					const res = await getStrategyTransactionList(this.sName, nowpage);
					if (res.status == 1) {
						this.history_data = this.history_data.concat(res.data);
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
			closeDropdown(e) {
				this.dropdownIndex = '';
			},
			startDateOpen() {
				this.dropdownIndex = ''
				this.rangeVisible = true
			},
			changeQueryDate(e) {
				console.log(e)
				this.sDateText = e.startDate
				this.eDateText = e.endDate
				//e.detail.value;
			},
			changeValue1(v) {
				this.value1 = v
				const index = this.options1.findIndex((item)=> {
					return item.value == v;
				});
				this.title1 = this.options1[index].label;
			},
		
			gotoCategoryView() {
				
			},
			swiperChange(e) {
				console.log('e'+JSON.stringify(e))
				this.activeIndex = e.detail.current;
			},
			fixedChange() {
				console.log('fixedChange')
			},
			unfixedChange() {
				console.log('unfixedChange')
			},  
			switchTab(index) {
				this.activeIndex = index;
			},
			setTagDataMarginTop() {
				
			},
			setIosBackground() {
				console.log('getApp().globalData', getApp().globalData);
				if (getApp().globalData.platform == 2) {
					uni.setBackgroundColor({
						backgroundColorTop: "#FFFFFF", // 顶部窗口的背景色为蓝色
						backgroundColorBottom: "#FFFFFF", // 底部窗口的背景色为绿
					});
				};
			},
			
			getHistoryData() {
				let page = this.pageNo;
			},
			getStrategyData() {
				
			},
			getStatusText(status) {
				 //1:平多(红色),2:做多(绿色),3:平空(绿色),4:做空(红色)
				 let objText = {
					 1: '平多',
					 2: '做多',
					 3: '平空',
					 4: '做空'
				 };
				 return objText[status];
			},
			back() {
				uni.navigateBack(1);
			},
			switchShow() {
				if(this.isOpenEyes == 1) {
					this.isOpenEyes = 0;
				} else {
					this.isOpenEyes = 1;
				}
			},
			getStatusColor(statusText) {
				if (statusText.indexOf('平')!==-1) {
					return "background:rgba(88,167,255,1);";
				}
				return "background:rgba(255,126,141,1);";
			}
		}
	}
</script>

<style lang="scss">
	
::-webkit-scrollbar {
	width: 0;
	height: 0;
    display: none;
	color: transparent;
} 
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	/*opacity: 0;*/
	background: rgba(0, 0, 0, 0.6);
	/*transition: transform 0.3s;*/
}

.warp {
	display: flex;
	justify-content: center;
	
	height: 100%;
}

.rect {
	width: 750rpx;
	height: 120px;
	background-color: #fff;
}

	
#root-view {
	display: flex;
	flex-direction: column;
	min-height: 120vh;
}

#header-view {
	display: flex;
	width: 750rpx;
	background-color: #FFFFFF;
	position: fixed;
	height: 40px;
	z-index: 4;
	/*z-index: 1;*/
}

#status-view {
	display: flex;
	width: 225rpx;
	z-index: -1;
	align-items: center;
	justify-content: center;
	color: #999999;
	::v-deep .u-dropdown__menu__item__text {
		color: #999999;
	}
}

#detail-title {
	position: absolute;
	left: 375rpx;
	font-size:28px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: rgba(255,255,255,1);
}

#single-strategy-stat-area {
	padding-top: 20px;
	display: flex;
	justify-content: center;
	/*margin-left:  32rpx;
	margin-right: 32rpx;*/
}

#history-header {
	margin-left: 41rpx;
	margin-bottom: 43rpx;
}

#history-header>text {
	font-size:28rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(0,0,0,1);
}
#history-table-view {
	display: flex;
	padding-top:40rpx;
	width: 686rpx;
	flex-direction: column;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 10px 0px rgba(186,186,186,0.2);
	border-radius:12px;
}


.history-common-date {
	font-size: 18rpx;
}

.flex-start-css {
	justify-content: flex-start !important;
}

.status-btn {
	/*width:100%;
	height:100%;*/
	padding: 10rpx;
	align-items: center;
	display: flex;
	font-size:24rpx;
	font-family:Source Han Sans CN;
	font-weight: bold;
	justify-content: center;
}
.date-select {
	width: 262.5rpx;
	color: #999999;
	font-size: 24rpx;
	text-align: center;
	display: flex;
	align-items: center;
}

#history-content {
	display: flex;
	margin-left:10rpx;
	margin-right:10rpx;
	flex-direction: column;
	margin-top: 23rpx;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}


.history-content-row {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 49rpx;
	margin-top: 40rpx;
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
	justify-content: center;
	align-items: center;
}

.history-common-date {
	color: #CCC;
	font-size: 24rpx;
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
.flex-center {
	justify-content: center;
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

.strategy-remark-css {
	font-family: Source Han Sans CN;
	font-weight: 600;
	font-size:24rpx;
	color: rgba(90,169,255,1);
	text-decoration: underline;
}

.data-label {
	color: #CCC;
	font-size: 24rpx;
}

.four_stat_view {
	display: flex;
	padding-left: 100rpx;
	padding-right: 120rpx;
	justify-content: space-between;
	padding-bottom: 20px;
	.view-stat-view-link {
		text-decoration: underline;
		color: #999999;
	}
}

.result-view-row {
	display: flex;
	padding-left: 32rpx;
	padding-right: 32rpx;
	margin-top: 10px;
	margin-bottom: 10px;
	justify-content: space-between;
}

.wrap-box-view {
	display: flex;
	padding-bottom: 30px;
	/*margin-top: 50px;*/
	margin-left: 42rpx;
	margin-right: 42rpx;
	width: 666rpx;
	/*z-index: 2;*/
}
</style>

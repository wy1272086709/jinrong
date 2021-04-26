<template>
	<!--
	<view class="bar-sticky" id="root-view">
		<u-sticky>
		<u-tabs :list="[{name: '交易账单'}, {name: '收益详情'}, {name: '资金明细'}]" active-color="#333" inactive-color="#999999" bg-color="#F2F2F2" item-width="250"  bar-height="3" :current="1" @change="clickSwithTab"></u-tabs>
		</u-sticky>
		-->
		<scroll-view :scroll-y="true" :style="{height: scrollHeight}">
		<view class="content-view list" >
			<view class="basic-info-border">
				<text>基本信息</text>
			</view>
			<view class="basic-info-list">
				<view class="basic-info-left">
					<view>
						<text>策略周期:</text>
					</view>
					<view>
						<text>开始运行时间:</text>
					</view>
					<view>
						<text>策略运行时长:</text>
					</view>
					<view>
						<text>合约:</text>
					</view>
					<view>
						<text>交易所:</text>
					</view>
				</view>
				<view class="basic-info-right">
					<view v-for="basic in basicInfoList" :key="basic.name">
						<text>{{basic.val}}</text>
					</view>
				</view>
			</view>
			
			
			<!-- <view class="income-curve qiun-charts">
				<view class="basic-info">
					<text>收益曲线</text>
				</view>
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="canvasLineA charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
				<view class="incom-btn-view">
					<u-button type="my"  class="stat-button" size="mini" @click="getStatData(30)" :customStyle="{ color: days == 30 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0,0,0, 0.2)' }">近一月</u-button>
					<u-button type="my" class="stat-button" size="mini" @click="getStatData(183)" :customStyle="{ color: days == 183 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0, 0, 0, 0.2)' }">近半年</u-button>
					<u-button type="my" class="stat-button" size="mini" @click="getStatData(365)" :customStyle="{ color: days == 365 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0, 0, 0, 0.2)' }">近一年</u-button>
					<u-button type="my" class="stat-button" size="mini" @click="getStatData(0)" :custom-style="{ color: days == 0 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0,0, 0, 0.2)'}">累计</u-button>
				</view>
			</view> -->
			<view class="u-m-t-20">
				<view class="charts-box">
				  <qiun-data-charts
				    type="line1"
				    :chartData="chartData"
				    :inScrollView="true"
				    :disableScroll="true"
					canvasId="NQdtTY3wbUf7aQ8acybcWrU9ADxyYj3K"
					:canvas2d="true"
				    background="#333"
				    :animation="false"
					:opts="{yAxis:{data:[{format:'yAxisDemo2'}]}}"
				  />
				</view>
				<view class="btn-month">
					<u-button type="my" throttle-time="50"  class="stat-button" size="mini" @click="getStatData(30)" :customStyle="{ color: days == 30 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0,0,0, 0.2)' }">近一月</u-button>
					<u-button type="my" throttle-time="50" class="stat-button" size="mini" @click="getStatData(183)" :customStyle="{ color: days == 183 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0, 0, 0, 0.2)' }">近半年</u-button>
					<u-button type="my" throttle-time="50" class="stat-button" size="mini" @click="getStatData(365)" :customStyle="{ color: days == 365 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0, 0, 0, 0.2)' }">近一年</u-button>
					<u-button type="my" throttle-time="50" class="stat-button" size="mini" @click="getStatData(0)" :custom-style="{ color: days == 0 ?  '#FFFFFF': '#ADADBD', backgroundColor: 'rgba(0,0, 0, 0.2)'}">累计</u-button>
				</view>
			</view>
			  
			
			<!--
			<view class="basic-info">
				<text>收益对比</text>
			</view>
			-->
			<!-- 收益对比 -->
			<view class="income-contrast u-m-l-10">
				<!--
				<vtable :columns="columns" :list="data" :row-class-name="'rowClassName'"></vtable>
				-->
				<u-table align="center" color="#b8b8b8" bg-color="#333" style="width: 686rpx;display: flex;">
					<u-tr style="background-color: #333333;">
						<u-th width="171.5rpx">
							<text class="mini-font">收益情况</text>
						</u-th>
						<u-th width="171.5rpx">
							<text class="mini-font">策略收益(%)</text>
						</u-th>
						<u-th width="171.5rpx">
							<text class="mini-font">持有收益(%)</text>
						</u-th>
						<u-th width="171.5rpx">
							<text class="mini-font">最大回撤(%)</text>
						</u-th>
					</u-tr>
					<u-tr v-for="item,index in data" :key="index">
						<u-td width="171.5rpx">{{item.label}}</u-td>
						<u-td width="171.5rpx" :customStyle="{ color:
						getColor(item.strategy_profit) }">
							{{item.strategy_profit}}
						</u-td>
						<u-td width="171.5rpx" :customStyle="{
							color:getColor(item.strategy_profit)}">
							{{item.market_profit}}
						</u-td>
						<u-td width="171.5rpx" :customStyle="{color:getColor(item.strategy_profit)}">
							{{item.profit_drawdown}}
						</u-td>
					</u-tr>
					
				</u-table>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import http from '@/common/http.js';
	// import uCharts from '@/components/u-charts/u-charts.js';
	import vtable from '@/components/table.vue';
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	// import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts-v2.0.0.js';
	
	let canvaLineA = {};
	let globalData;
	let chart = null;
	
	export default {
		data() {
			let _self = this;
			return {
				basicInfoList: [
					{ name: 'stragegy_period', val: '' },
					{ name: 'start_time', val: '' },
					{ name: 'run_times', val: '' },
					{ name: 'contract', val: '' },
					{ name: 'exchange', val: '' },
				],
				pixelRatio: 1,
				cWidth: '',
				cHeight: '',
				days: 30,
				scrollHeight: '',
				backStyle: {
					
				},
				data: [
					
				],
				chartData:{
				  categories:[],
				  series:[],
				},
				columns: [],
				colW: ''
			}
		},
		props: {
			sName: {
				type: String,
				default: '',
			}
		},
		components:{
			vtable
		},
		watch: {
			sName: function(nval, oval) {
				if (!nval) return;
				this.columns = [
						{ title: '', key: 'profit_type',$width: uni.upx2px(686/4)},
						{ title: '策略收益(%)', key: 'strategy_profit',$width: uni.upx2px(686/4)},
						{ title: '持有收益(%)', key: 'market_profit',$width: uni.upx2px(684/4)},
						{ title: '最大回撤(%)', key: 'profit_drawdown',$width: uni.upx2px(684/4)},
				];
				// px转换到rpx的比
				console.log(this.sName+'this.sName;');
				this.getSingleStrategyStatData(this.sName);
				this.getProfitCurve(this.sName, 30);
			}
		},
		async onPullDownRefresh() {
			await this.getSingleStrategyStatData(this.sName);
			await this.getProfitCurve(this.sName, 30);
			uni.stopPullDownRefresh();
		},
		async created() {
			const systemInfo = uni.getSystemInfoSync();
			this.cWidth  = uni.upx2px(666);
			this.cHeight = uni.upx2px(500);
			console.log('info2'+JSON.stringify(systemInfo))
			this.isIphoneX = getApp().globalData.isIphoneX
			const iphoneXPadding = this.isIphoneX?uni.upx2px(68):0
			console.log('padding2:'+iphoneXPadding)
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(80) - iphoneXPadding - uni.upx2px(3)- 3+'px'
			
			// #ifdef APP-PLUS || H5
			if (!this.sName) return;
			this.columns = [
					{ title: '', key: 'profit_type',$width: uni.upx2px(686/4)},
					{ title: '策略收益(%)', key: 'strategy_profit',$width: uni.upx2px(686/4)},
					{ title: '持有收益(%)', key: 'market_profit',$width: uni.upx2px(684/4)},
					{ title: '最大回撤(%)', key: 'profit_drawdown',$width: uni.upx2px(684/4)},
			];
			// px转换到rpx的比
			console.log(this.sName+'this.sName;');
			await this.getSingleStrategyStatData(this.sName);
			await this.getProfitCurve(this.sName, 30);
			// #endif
		},
		beforeDestroy() {
			console.log('component destory...')
		},
		methods: {
			clickSwithTab(index) {
			
			},
			measureText () {
				return ''
			},
			getStatData(days) {
				this.days = days;
				this.getProfitCurve(this.sName, days);
			},
			incomeCurve(canvasId, chartData) {
				let _self = this;
				let n = chartData.categories.length;
				let showDays = _self.days ==0 ? n: _self.days;
				let labelCount = 4;
				if (showDays == 30 && n>4 && n<30) {
					// 显示4个
					labelCount = Math.floor(4 * (30/n));
				} else if(showDays == 183 && n<180){
					// 180-->4
					// 66 -->
					labelCount = Math.floor(4 * (180/n));
				} else if(showDays == 365 && n<365){
					labelCount = Math.floor(4 * (365/n));
				} else {
					labelCount = 4;
				}
				
				//console.log('labelCount', labelCount);
				//let context = uni.createCanvasContext('canvasLineA')
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					//context: context,
					type: 'line',
					fontSize:11,
					//上，右，下，左
					padding:[0,0,0,0],
					legend:{
						show:true,
						padding:0,
						lineHeight:11,
						margin:0,
						fontColor: '#FFFFFF'
					},
					colors: [ '#0BF4FD', '#EE4368', '#0BF4FD', '#EE4368' ],
					dataLabel:false,
					dataPointShape:false,
					background:'rgba(255, 255, 255, 0.1)',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					enableMarkLine: true,
					//animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						type:'grid',
						disableGrid: true,
						gridColor:'#FFFFFF',
						boundaryGap:'justify',
						gridType:'solid',
						//scrollShow: true,
						dashLength:8,
						//itemCount: 4,
						labelCount: labelCount,//为啥为9呢?
						fontSize:8,
						itemCount: showDays,
						//scrollAlign: 'left',
					},
					enableMarkLine: true,
					
					yAxis: {
						gridType:'solid',
						gridColor:'#FFFFFF',
						dashLength:8,
						splitNumber:8,
						format:(val)=>{return val.toFixed(0)+'%'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
						//dataLabel: true,
					/*dataPointShape: true,*/
					extra: {
						line:{
							type: 'curve'
						},
						legendTextColor: '#0BF4FD',
						markLine: {
							type: 'dash',
							data: {
								showLabel: true
							}
						},
						tooltip:{
								showBox:true,//是否显示半透明黑色的提示区域
								bgColor:'#000000',//主体背景颜色
								bgOpacity:1,//背景颜色透明度
								gridType:'dash',//辅助线类型（虚线）
								dashLength:5,//虚线单段长度
								gridColor:'#1890ff',//辅助线颜色
								fontColor:'#FFFFFF',//主体文字颜色
								horizentalLine:true,//是否显示横向辅助线
								xAxisLabel:true,//是否显示X轴辅助标签
								yAxisLabel:true,//是否显示Y轴辅助标签
								labelBgColor:'#FFFFFF',//标签背景颜色
								labelBgOpacity:0.95,//背景颜色透明度
								labelFontColor:'#666666'//标签文字颜色
							}
					}
				});
			},
			back() {
				uni.navigateBack({
					delta:1
				});
			},
			// 获取收益曲线
			async getProfitCurve(sName, days) {
				const url = getApp().globalData.serverUrl+"/strategys/yield_history";
				const token = uni.getStorageSync('wx_login_token');
				let resp = await http.request(url, {
					token: token,
					sname: sName,
					days: days,
					filterData: true,
				});
				if (resp.status == 1) {
					const data = resp.data;
					// this.incomeCurve('canvasLineA', {
					// 	categories:data.categories,
					// 	series:data.series
					// });
					this.chartData.categories = data.categories;
					this.chartData.series = data.series;
					console.log("data is: " + this.chartData.categories+" "+this.chartData.series);
				}
			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				console.log('move lineA');
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				canvaLineA.touchLegend(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						category = category.replace(/\-/g, '/');
						return category + ' ' + item.name + ':' + item.data+'%';
					}
				});
			},
			async getSingleStrategyStatData(sName) {
				// 获取策略面板数组
				const url = getApp().globalData.serverUrl+"/strategys/single_stats";
				const token = uni.getStorageSync('wx_login_token');
				let resp = await http.request(url, {
					token: token,
					sname: sName,
					filterData: true,
				});
				if(resp.status == 1) {
					// 处理上面的
					const respData = resp.data;
					//console.log('data', respData);
					const windowVal = respData.window ? respData.window: respData.windows;
					
					this.basicInfoList = [
						{ name: 'stragegy_period', val:  windowVal },
						{ name: 'start_time', val: respData.start_datetime },
						{ name: 'run_times', val: respData.run_time },
						{ name: 'contract', val: respData.swap_exchange.trading },
						{ name: 'exchange', val: respData.swap_exchange.exchange }
					];
					const strategyData = respData.yield_strategy;
					const marketData = respData.yield_market;
					const drawData   = respData.profit_drawdown;
					this.data = [
						{
							label: '近一个月',
							strategy_profit: strategyData.month, market_profit: marketData.month, 
							profit_drawdown: drawData.month.drawdown_rate===undefined? '/': drawData.month.drawdown_rate
						},
						{
							label: '近半年',
							strategy_profit: strategyData.halfyear, market_profit: marketData.halfyear,
							profit_drawdown: drawData.halfYear.drawdown_rate===undefined? '/': drawData.halfYear.drawdown_rate
						},
						{
							label: '近1年',
							strategy_profit: strategyData.year, market_profit: marketData.year,
							profit_drawdown: drawData.year.drawdown_rate===undefined? '/': drawData.year.drawdown_rate
						},
						{
							label: '累计',
							strategy_profit: strategyData.total, market_profit: marketData.total,
							profit_drawdown: drawData.total.drawdown_rate===undefined? '/': drawData.total.drawdown_rate
						}
					]
					
				}
			},
			getColor(value) {
				let color = ''
				if (value===undefined) {
					color = '#FFFFFF'
					return
				}
				if (value==0) {
					color = '#FFFFFF'
				}
				else if(value<0) {
					color = '#ED4066'
				}
				else if(value>0) {
					color = '#0BF4FD'
				}
				return color;
			}
		}
	}
</script>

<style lang="scss">
	/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
	.charts-box{
	  width: 100%;
	  height:300px;
	}
::-webkit-scrollbar {
	width: 0;
	height: 0;
    display: none;
	color: transparent;
}

	.list {
	    padding-bottom: 0;  
	    padding-bottom: constant(safe-area-inset-bottom);  
	    padding-bottom: env(safe-area-inset-bottom);  
		background-color: #333;
	}
	.btn-month{
		margin: 20rpx 0 20rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.common-font {
		font-size: 28rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	
	.common-btn {
		background: rgba(#FFFFFF, 0.2);
		border-radius: 8rpx;
	}
	
	.mini-font {
		font-size: 24rpx;
		color: #b8b8b8;
	}
	.red-text {
		color: red;
		
	}
	.green-text {
		color: green;
		
	}

	/* 通用样式 */
	.qiun-charts {
		width: 686rpx;
		background: rgba(255, 255, 255 , 0.1);
		margin-bottom: 20px;
		padding-bottom: 20px;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		.incom-btn-view {
			display: flex;
			justify-content:space-bettwen;
			margin-left: 66rpx;
			margin-right:66rpx;
			
			.stat-button {
				line-height: 2;
				font-size: 32rpx;
				font-size: 16px;
				padding-left:10px;
				padding-right:10px;
			}
		}
	}
	
	.rowClassName {
		
	}
	.charts {
		width: 682rpx;
		height: 500rpx;
		
	}
	
	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700rpx;
		height: 1100rpx;
		background-color: #FFFFFF;
		padding: 25rpx;
	}
	
	.charts-rotate {
		width: 700rpx;
		height: 1100rpx;
		background-color: #FFFFFF;
	}
	
	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750rpx;
		height: 250rpx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250rpx;
		height: 250rpx;
	}
	
	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15rpx;
		height: 30rpx;
		line-height: 30rpx;
		margin: 10rpx;
		background: #ff9933;
		font-size: 30rpx;
		border-radius: 8rpx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}

	.content-view {
		margin-left:20rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		background-color: $kp-bg-color;
		color: $kp-font-color;
		
		
		
		.basic-info {
			margin-top:20px;
			margin-left: 32rpx;
			font-weight: bolder;
			/*border-bottom: 1px solid #969696;*/
			margin-bottom:10px;
			margin-bottom: 10px;
		}
		.basic-info-border {
			margin-top:20px;
			padding-bottom: 10px;
			font-weight: bolder;
			border-bottom: 1px solid rgba($color: #FFFFFF, $alpha: 0.3);
		}
		.income-contrast {
			display: flex;
			margin-bottom:20px;
			.no-bad-table-wrap {
				width:686rpx;
			}
			
			.div-table-head {
				//border-bottom: 1rpx solid black;
			}
		}
		.basic-info-list {
			margin-top:10px;
			color: #B8B8B8;;
			display: flex;
			flex-direction: row;
			.basic-info-left {
				width:50%;
				flex-direction: column;
			}
			.basic-info-right {
				width:50%;
				
				flex-direction: column;
			}
		}
		
	}
</style>

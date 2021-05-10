<template>
	<!-- :style="{height}" -->
	<view id="root-view" :style="{height}">
		
		<view id="income-view">
			<!--
			<u-gap height="14"  bg-color="rgba(#4D5269, 0.5)"></u-gap>
			-->
			<view class="gap-view"></view>
			<view class="income-view-table">
				<view v-for="item,index in statRes" class="income-view-table-td">
					<view class="income-view-table-td-top" :style="index == statRes.length -1 ? 'border-right:none': ''">
						<view class="income-view-table-td-label">{{item.label}}</view>
						<view :class="parseFloat(item.data[0])<0?'red-css':'green-css'">{{item.data[0]}}</view>
					</view>
					<view class="income-view-table-td-bottom" :style="index == statRes.length -1 ? 'border-right:none': ''">
						<!-- 这里有个箭头... -->
						<view>
							<image v-if="parseFloat(item.data[1])<0" src="../../static/image/overall_view/next.png" style="width: 30rpx;height: 30rpx;"></image>
							<image v-if="parseFloat(item.data[1])>=0" src="../../static/image/overall_view/prev.png" style="width: 30rpx;height: 30rpx;"></image>
						</view>
						<view :class="parseFloat(item.data[1])<0?'red-css':'green-css'">
							{{item.data[1]}}
						</view>
					</view>
				</view>
			</view>
			<view class="gap-view"></view>
			<!--
			<u-gap height="14"  bg-color="rgba(#4D5269, 0.5)"></u-gap>
			-->
		</view>
		<!-- <view id="income-curve-view" class="u-m-t-40">
			
			<view id="income-curve-view-stat">
				<view id="income-curve-view-canvas">
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
				</view>
				
			</view>
		</view> -->
		<view class="u-m-t-20 u-m-b-20 u-m-l-20">
			<text class="title ">每日收益</text>
		</view>
		<view class="charts-box">
		  <qiun-data-charts
		    type="column"
			
		    :chartData="chartData"
			:eopts="{legend: {textStyle: {
			          color: '#FFF'
			        }}}"
		    :inScrollView="true"
			canvasId="NQdtTYwbUfaQacybcWrUADxyYjK"
		    :canvas2d="true"
		    background="#333"
		    :animation="false"
		    :ontouch="true"
			:echartsH5="true" 
			:echartsApp="true"
		  />
		</view>
		<view id="income-curve-view">
			<view id="income-curve-view-stat-button">
				<u-button type="my" size="mini" :custom-style="{ backgroundColor: date_limit==0?'#676D81':'rgba(255,255,255, 0.1)', color: date_limit == 0? '#FFFFFF': '#C6C6C6'}" @click="getIncomeCurve(0)" throttleTime="50">近一月</u-button>
				<u-button type="my" size="mini" :custom-style="{ backgroundColor: date_limit==1?'#676D81': 'rgba(255,255,255, 0.1)', color: date_limit == 1? '#FFFFFF': '#C6C6C6' }" @click="getIncomeCurve(1)" throttleTime="50">近半年</u-button>
				<u-button type="my" :custom-style="{ backgroundColor: date_limit==2?'#676D81': 'rgba(255,255,255, 0.1)', color: date_limit == 2? '#FFFFFF': '#C6C6C6'}" size="mini" @click="getIncomeCurve(2)" throttleTime="50">近一年</u-button>
				<u-button type="my" :custom-style="{ backgroundColor: date_limit==3?'#676D81':'rgba(255,255,255, 0.1)',  color: date_limit == 3? '#FFFFFF': '#C6C6C6'}" size="mini" @click="getIncomeCurve(3)" throttleTime="50">全部</u-button>
			</view>
		</view>
		
		
		<view class="u-m-t-20 u-m-b-20 u-m-l-20">
			<text class="title ">累计盈亏</text>
		</view>
		
		<view class="charts-box">
		  <qiun-data-charts
		    type="line2"
		    :chartData="chartData1"
		    :inScrollView="true"
		    canvasId="MCScEZfB5JkHmwLAOBSANGpfoHaViPSx"
		    :canvas2d="true"
		    background="#333333"
		    :animation="false"
		    :ontouch="true"
			
		  />
		</view>
		
		
	</view>
</template>
  
<script>
	import {
		mapState
	} from 'vuex';
	import http from '@/common/http.js';
	import uCharts from '../../components/u-charts/u-charts.js';
	import uCharts1 from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-echarts.js';
	import {getDaysProfit,getProfit_cumulative} from '@/api/overall_stat.js'
	let canvaLineA = {};
	let chart = null;
	export default {
		computed: {
			...mapState([ 'strategistId']),
		},
		data() {
			return {
				statRes: [
					
				],
				pixelRatio:1,
				width: '',
				height: '',
				cWidth: '',
				cHeight: '',
				date_limit: 0,
				chartData:{},
				chartData1:{},
				tips:'',
				index:0
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			console.log('info'+JSON.stringify(info));
			this.width = info.windowWidth + 'px';
			this.height= info.windowHeight + 'px';
			this.cWidth  = uni.upx2px(666);
			this.cHeight = uni.upx2px(500);
			this.getCategorySumStats();
			this.getIncomeCurve(0);
			
		},
		methods: {
			 // complete(e) {
				// //#ifndef APP-PLUS
				// 	if(this.chartData1)
				// 	{
				// 		const chartData2 = this.chartData1;
				// 		const data = chartData2.categories;
				// 		const date = chartData2.date;
				// 		this.tips = chartData2.tips;
				// 		for(var i = 0;i<data.length;i++)
				// 		{
				// 			  if(data[i] == date)
				// 			  {
				// 				  this.index = i;
				// 			  }
				// 		}
				// 		let textList = [
				// 		  { text: "this.tips", color: null },
				// 		  // { text: '类别1：某个值xxx', color: '#2fc25b' },
				// 		  // { text: '类别2：某个值xxx', color: '#facc14' },
				// 		  // { text: '类别3：某个值xxx', color: '#f04864' }
				// 		];
				// 		uCharts1.instance[e.id].showToolTip(
				// 		  { changedTouches: [{ x: 0, y: 150 }] },
				// 		  {
				// 		    index:3,
				// 		    textList: textList
				// 		  }
				// 		);
				// 	}
				// //#endif
			 // },
			async getIncomeCurve(dateLimit)
			{
				this.date_limit = dateLimit;
				const strategistId = this.strategistId;
				const data =await getDaysProfit(this.strategistId,dateLimit);
				if(data)
				{
					console.log('data',JSON.parse(JSON.stringify(data)));
					let chartdata1 = JSON.parse(JSON.stringify(data));
					//this.chartData1 = JSON.parse(JSON.stringify(data));
					for(var i = 0;i<chartdata1.series[0].data.length;i++)
					{
						//chartdata1.series[0].format = "yAxisDemo2";
						if(chartdata1.series[0].data[i]>=0)
						{
							chartdata1.series[0].data[i]={value: chartdata1.series[0].data[i],itemStyle: {color:'#0BF4FD'}}
						}
						else{
							chartdata1.series[0].data[i]={value: chartdata1.series[0].data[i],itemStyle: {color:'#EE4368'}}
						}
					}
					this.chartData = chartdata1;
					console.log('this.chartData:')
					console.log(this.chartData)
				}
				
				this.chartData1 = await getProfit_cumulative(this.strategistId,dateLimit);
			
			},
			getCategorySumStats()
			{
				// 获取策略面板数组
				const url = getApp().globalData.serverUrl+"/strategys/overall_stats";
				const token = uni.getStorageSync('wx_login_token');
				let params = {
					token:token,
					filterData: true,
				};
				params.strategist_id = this.strategistId;
				http.request(url, params).then(resp => {
					if(resp.status == 1) {
						let data = resp.data;
						this.overall_info = data.overall;
						
						this.statRes = [
							{ label: '总收益', data: [
								data.overall.accumulated_income,
								data.overall.cumulative_rate + "%"
							] },
							{ label: '近一月收益', data: [
								data.overall.earnings.month,
								data.overall.nearly_month + "%"
							] },
							{ label: '七日收益', data: [
								data.overall.earnings.week,
								data.overall.nearly_week + "%"
							] },
						]
						
						/*this.statRes[0].num = data.overall.accumulated_income;
						this.statRes[1].num = data.overall.earnings.month;
						this.statRes[2].num = data.overall.earnings.week;
						this.statRes[3].num = data.overall.cumulative_rate + "%";
						this.statRes[4].num = data.overall.nearly_month + "%";
						this.statRes[5].num = data.overall.nearly_week + "%";
						*/
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	
	.charts-box{
	  width: 100%;
	  height:300px;
	}
	.title{
		color: #FFFFFF;
	}
	#root-view {
		/*display: flex;*/
		
		background: $kp-bg-color;
		min-height: 100vh;
		/*flex-direction: column;*/
		
		
	}
	
	.charts {
		width: 666rpx;
		height: 500rpx;
	}
	.common-font-1 {
		font-size: 22rpx;
		font-family: SimHei;
		font-weight: 400;
	}
	.label-font-color {
		color: rgba(#FFFFFF, 0.7);
	}
	
	.gap-view {
		background: #4D5269;
		opacity: 0.5;
		height: 14rpx;
	}
	
	#income-view {
		display: flex;
		padding-top: 40rpx;
		flex-direction: column;
		.income-view-table {
			/*padding-top: 20rpx;
			padding-bottom: 20rpx;*/
			/*background: rgba(255, 255, 255, 1);*/
			display: flex;
			flex-wrap:wrap;
			&-td {
				display: flex;
				flex-direction: column;
				flex: 1;
				text-align: center;
				
				&-label {
					@extend .common-font-1;
					@extend  .label-font-color;
				}
				&-top {
					>view:nth-child(1) {
						
					}
					>view:nth-child(2) {
						margin-top: 31rpx;
					}
					padding-top: 36rpx;
					padding-bottom: 14rpx;
					
				}
				&-bottom {
					display: flex;
					justify-content: center;
					>view:nth-child(1) {
						margin-right: 16rpx;
					}
					padding-bottom: 36rpx;
					padding-top: 60rpx;
					
				}
				
				&-top {
					
				}
			}
			
		}
	}
	
	.income-view-table-td-top {
		border-right: 1px solid rgba(#FFFFFF, 0.2);
		border-bottom: 1px solid rgba(#FFFFFF, 0.1);
	}
	
	.income-view-table-td-bottom {
		border-right: 1px solid rgba(#FFFFFF, 0.2);
		border-bottom: 1px solid rgba(#FFFFFF, 0.1);
	} 

	#income-curve-view {
		padding-left: 42rpx;
		padding-right: 42rpx;
		&-stat {
			display: flex;
			flex-direction: column;
			/*background: rgba(255, 255, 255, 1);*/
			&-button {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				margin-bottom: 20px;
				margin-left: 32rpx;
				margin-right: 32rpx;
				::v-deep .u-default-hover {
					background-color: rgba($color: #FFFFFF, $alpha: 0.3);
				}
			}
		}
	}
	.label-income {
		font-weight: 600;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #F2F2F2;
	}
	.red-css {
		color: $kp-red-color;
		font-weight: bold;
	}
	.green-css {
		color: $kp-blue-color;
		font-weight: bold;
	}
</style>

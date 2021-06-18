<template>
	<!-- :style="{height}" -->
	<scroll-view id="root-view" :scroll-y="true" :style="{height}">
		<u-no-network></u-no-network>
		<view id="income-view">
			<!--
			<u-gap height="14"  bg-color="rgba(#4D5269, 0.5)"></u-gap>
			-->
			<view class="gap-view"></view>
			<view class="income-view-table">
				<view v-for="item,index in statRes" class="income-view-table-td" :key="index">
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
		<view class="myBorder">
			<view class="u-m-t-20 u-m-b-20 u-m-l-20 u-item-title">
				<text class="title ">每日收益</text>
			</view>
			
			<!--
			<view>
				<navigator url="/pages/user/test">跳转链接</navigator>
			</view>
			-->
			<view class="charts-box">
				<!--
			  <qiun-data-charts
			    type="column4"
			    :chartData="chartData"
			    canvasId="aF2d6ejUMpFr00Z9c1dREg7xaUup0Mpu"
			    :canvas2d="true"
			    background="#4D5269"
				:disableScroll="true"
			  	opts="{enableScroll: false}"
			    :ontouch="true"
			  	:onmovetip="true"
			  	@getTouchMove="getTouchMove"
				:opts="{xAxis:{format:'xAxis'}}"
			  />
			  -->
			  <ec-canvas canvasId="mychart-dom" @onInit="renderChart1" :ec="ec"></ec-canvas>
			
			
			</view>
			
			<view class="dataDate">
				
				<u-subsection @change="sectionChange" height="50" font-size="20" :list="list" mode="button" active-color="#1890FF" inactive-color="#4D5269"></u-subsection>
				
			</view>
		</view>
		
		<view class="myBorder">
			<view class="u-m-t-20 u-m-b-20 u-m-l-20 u-item-title">
				<text class="title ">累计盈亏</text>
			</view>
			
			<view class="charts-box">
			<!--
			  <qiun-data-charts
			    type="line3"
			    :chartData="chartData3"
			    canvasId="MCScEZfB5JkHmwLAOBSANGpfoHaViPSx"
			    :canvas2d="true"
			    background="#4D5269"
				:disableScroll="true"
			    opts="{enableScroll: false}"
			    :ontouch="true"
			    :onmovetip="true"
			    @getTouchMove="getTouchMove"
			  />
			  -->
			  
			  <ec-canvas canvasId="mychart-dom2" @onInit="renderChart1" :ec="ec2"></ec-canvas>
			  
			</view>
			
			<view class="dataDate">
				
				<u-subsection @change="sectionChange1" height="50" font-size="20" :list="list" mode="button" active-color="#1890FF" inactive-color="#4D5269"></u-subsection>
				
			</view>
		</view>
		<u-loadmore bg-color="#333" margin-top="20" margin-bottom="20" status="nomore"></u-loadmore>
		
	</scroll-view>
</template>
  
<script>
	import {
		mapState
	} from 'vuex';
	import http from '@/common/http.js';
	import * as echarts from '@/components/echarts.min.js';
	//import uCharts from '../../components/u-charts/u-charts.js'
	//import uCharts1 from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js'
	import ecCanvas from '@/components/uni-ec-canvas.vue'
   import { commonConfig, lineConfig } from '@/components/echarts.config.js'
    
	import {getDaysProfit,getProfit_cumulative} from '@/api/overall_stat.js'
	let canvaLineA = {};
	let chart = null;
	export default {
		computed: {
			...mapState(['strategistId']),
		},
		components: {
			ecCanvas
		},
		data() {
			const _self = this
			const obj =  {
				statRes: [
					
				],
				ec: {
					option: {}
				},
				ec2: {
					option: {}
				},
				pixelRatio:1,
				width: '',
				lazyLoad: true,
				height: '',
				cWidth: '',
				cHeight: '',
				date_limit: 0,
				chartData:{},
				chartData3:{},
				tips:'',
				index:0,
				list:[
					{
						name:'近一月'
					},
					{
						name:'近半年'
					},
					{
						name:'近一年'
					},
					{
						name:'近三年'
					}
				],
				current:0,
			}
			return obj
			
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
			this.getcumulative(0);
			console.log(commonConfig)
		},
		methods: {
			async renderChart1(e) {
				
			},
			sectionChange(index){
				console.log("sectionchange");
				switch(index){
					case 0:
						console.log("sectionchange0");
						this.current = 0;
						this.getIncomeCurve(0);
						break;
					case 1:
						console.log("sectionchange1");
						this.current = 1;
						this.getIncomeCurve(1);
						break;
					case 2:
						console.log("sectionchange2");
						this.current = 2;
						this.getIncomeCurve(2);
						break;
					case 3:
						console.log("sectionchange3");
						this.current = 3;
						this.getIncomeCurve(3);
						break;
					default:
						console.log("sectionchange9");
						break;
				}
			},
			sectionChange1(index){
				console.log("sectionchange");
				switch(index){
					case 0:
						console.log("sectionchange0");
						this.current = 0;
						this.getcumulative(0);
						break;
					case 1:
						console.log("sectionchange1");
						this.current = 1;
						this.getcumulative(1);
						break;
					case 2:
						console.log("sectionchange2");
						this.current = 2;
						this.getcumulative(2);
						break;
					case 3:
						console.log("sectionchange3");
						this.current = 3;
						this.getcumulative(3);
						break;
					default:
						console.log("sectionchange9");
						break;
				}
			},
			async getcumulative(dataLimit)
			{
				console.log('getcumulative')
				console.log(this.strategistId)
				let chartdata2 =await getProfit_cumulative(this.strategistId,dataLimit);
				
				if(dataLimit==0)
				{
					for(var j = 0 ;j<chartdata2.categories.length;j++)
					{
						chartdata2.categories[j] = chartdata2.categories[j].substr(5,9);
					}
				}
				lineConfig.xAxis[0].data = chartdata2.categories
				lineConfig.series[0].data = chartdata2.series[0].data
				//lineConfig.categories = chartdata2.categories
				this.ec2.option = lineConfig
				//this.chartData3= chartdata2				
			},
			async getIncomeCurve(dateLimit)
			{
				console.log('getINcomeCurve')
				
				this.date_limit = dateLimit;
				const strategistId = this.strategistId;
				let data = []
				try{
					data =await getDaysProfit(this.strategistId,dateLimit);
				} catch(e) {
					
				}
				console.log(data)
				try{
					if(data && !Array.isArray(data))
					{
						console.log('data here!')
						let chartdata1 = data
						console.log(data)
						//console.log('data',JSON.parse(JSON.stringify(data)));
						//let chartdata1 = JSON.parse(JSON.stringify(data));
						// (红色表示亏损,绿色表示盈利)
						chartdata1.series[0].name="收益";
						chartdata1.series[0].type = 'bar'
						if(dateLimit==0)
						{
							for(var j = 0 ;j<chartdata1.categories.length;j++)
							{
								chartdata1.categories[j] = chartdata1.categories[j].substr(5,9);
							}
						}
						for(var i = 0;i<chartdata1.series[0].data.length;i++)
						{
							const v = parseFloat(chartdata1.series[0].data[i])
							if(chartdata1.series[0].data[i]>=0)
							{
								chartdata1.series[0].data[i]={ value: v.toFixed(2), itemStyle: { color:'#00C087'} }
							}
							else{
								chartdata1.series[0].data[i]= { value: v.toFixed(2), itemStyle: { color:'#ED6160' } }
							}
						}
						
						commonConfig.series[0].data = chartdata1.series[0].data;
						commonConfig.xAxis[0].data = chartdata1.categories
						this.commonConfig = commonConfig  
						console.log(commonConfig)
						this.ec.option = commonConfig
					}
				} catch(e) {
					
				}
			},
			getTouchMove(e){
				console.log("获取TouchMove",e);
			},
			getTouchMove1(e){
				console.log("获取TouchMove",e);
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
					}
				});
			},
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
	
	.myBorder{
		/*height: 560rpx;*/
		height: 670rpx;
		border: 1px solid #4D5269;
		border-radius: 20rpx;
		background-color: #4D5269;
		margin: 20rpx;
	}
	.dataDate{
		margin: 20rpx;
		
	}
	.charts-box{
	  width: 100%;
	  height:500rpx;
	}
	
	/*.ec-canvas {
	  width: 100%;
	  height: 500rpx;
	} */
	
	.title{
		color: #FFFFFF;
	}
	#root-view {
		/*display: flex;*/
		
		background: $kp-bg-color;
		min-height: 100vh;
		/*flex-direction: column;*/
		
		
	}
	
	
	
	.u-item-title {
		position: relative;
		font-size: 15px;
		padding-left: 8px;
		line-height: 1;
		margin-bottom: 11px;
	}
	
	.u-item-title:after {
		position: absolute;
		width: 4px;
		top: -1px;
		height: 16px;
		/* #ifndef APP-NVUE */
		content: '';
		/* #endif */
		left: 0;
		border-radius: 10px;
		background-color: $u-type-primary;
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


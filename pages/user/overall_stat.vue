<template>
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
		<view id="income-curve-view" class="u-m-t-40">
			
			<view id="income-curve-view-stat">
				<view id="income-curve-view-canvas">
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
				</view>
				<view id="income-curve-view-stat-button">
					<u-button type="my" size="mini" :custom-style="{ backgroundColor: date_limit==0?'#676D81':'rgba(255,255,255, 0.1)', color: date_limit == 0? '#FFFFFF': '#C6C6C6'}" @click="getIncomeCurve(0)" throttleTime="50">近一月</u-button>
					<u-button type="my" size="mini" :custom-style="{ backgroundColor: date_limit==1?'#676D81': 'rgba(255,255,255, 0.1)', color: date_limit == 1? '#FFFFFF': '#C6C6C6' }" @click="getIncomeCurve(1)" throttleTime="50">近半年</u-button>
					<u-button type="my" :custom-style="{ backgroundColor: date_limit==2?'#676D81': 'rgba(255,255,255, 0.1)', color: date_limit == 2? '#FFFFFF': '#C6C6C6'}" size="mini" @click="getIncomeCurve(2)" throttleTime="50">近一年</u-button>
					<u-button type="my" :custom-style="{ backgroundColor: date_limit==3?'#676D81':'rgba(255,255,255, 0.1)',  color: date_limit == 3? '#FFFFFF': '#C6C6C6'}" size="mini" @click="getIncomeCurve(3)" throttleTime="50">全部</u-button>
				</view>
			</view>
		</view>
		
		
		
		
		
		
		
		
	</view>
</template>
  
<script>
	import {
		mapState
	} from 'vuex';
	import http from '@/common/http.js';
	import uCharts from '../../components/u-charts/u-charts.js';
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
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				console.log('move lineA');
				canvaLineA.scroll(e);
			},
			incomeCurve(canvasId, chartData) {
				let _self = this;
				let n = chartData.categories.length;
				let days = 30;
				if (_self.date_limit == 1) {
					days = 183
				} else if(_self.date_limit == 2) {
					days = 365
				} else if(_self.date_limit == 0){
					days = 30;
				}
				let showDays = _self.date_limit ==3 ? n: days;
				let labelCount = 4;
				if (_self.date_limit == 0 && n>4 && n<30) {
					// 显示4个
					labelCount = Math.floor(4 * (30/n));
				} else if(_self.date_limit == 1 && n<180) {
					labelCount = Math.floor(4 * (180/n));
				} else if(_self.date_limit == 2 && n<365) {
					labelCount = Math.floor(4 * (365/n));
				} else {
					labelCount = 4;
				}
				let context =  uni.createCanvasContext(canvasId)
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					context: context,
					type: 'line',
					fontSize:11,
					padding:[0,20,0,0],
					legend:{show:true, padding:0,
							lineHeight:11,
							fontColor: '#999',
							margin:0,},
					dataLabel:false,
					dataPointShape:false,
					background:'#333',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					enableMarkLine: true,
					//animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						type:'grid',
						disableGrid: true,
						gridColor:'#999',
						boundaryGap:'justify',
						gridType:'dash',
						//scrollShow: true,
						dashLength:8,
						//itemCount: 4,
						labelCount: labelCount,//为啥为9呢?
						fontSize:10,
						itemCount: showDays
						//scrollAlign: 'left',
					},
					enableMarkLine: true,
					
					yAxis: {
						gridType:'dash',
						gridColor:'#999',
						dashLength:8,
						splitNumber:8,
						format:(val)=>{return val.toFixed(1)+''}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
						//dataLabel: true,
					/*dataPointShape: true,*/
					extra: {
						line:{
							type: 'curve'
						},
						markLine: {
							type: 'dash',
							data: {
								showLabel: true
							}
						},
						tooltip:{
								showBox:true,//是否显示半透明黑色的提示区域
								bgColor:'#000000',//主体背景颜色
								bgOpacity:0.7,//背景颜色透明度
								gridType:'dash',//辅助线类型（虚线）
								dashLength:5,//虚线单段长度
								gridColor:'#1890ff',//辅助线颜色
								fontColor:'#FFFFFF',//主体文字颜色
								horizentalLine:true,//是否显示横向辅助线
								xAxisLabel:true,//是否显示X轴辅助标签
								yAxisLabel:false,//是否显示Y轴辅助标签
								labelBgColor:'#DFE8FF',//标签背景颜色
								labelBgOpacity:0.95,//背景颜色透明度
								labelFontColor:'#666666'//标签文字颜色
						}
					}
				});
			},
			getIncomeCurve(dateLimit)
			{
				this.date_limit = dateLimit;
				const strategistId = this.strategistId;
				// 获取策略面板数组
				const url = getApp().globalData.serverUrl+"/strategys/profit/yield_curverch";
				const token = uni.getStorageSync('wx_login_token');
				let params = {
					token:token,
					filterData: true,
					date_limit: dateLimit
				};
				params.strategist_id = this.strategistId;
				http.request(url, params).then(resp => {
					if(resp.status == 1) {
						let data = resp.data;
						console.log('data');
						this.incomeCurve('canvasLineA', {
							categories:data.categories,
							series:data.series
						});
					}
				});
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
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				canvaLineA.touchLegend(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						//console.log('item', item,'category:', category);
						category = category.replace(/\-/g, '/');
						//item.name = item.name.length>6? '具体策略': item.name;
						return category + ' ' + item.name + ':' + item.data;
					}
				});
			},
		}
	}
</script>

<style lang="scss">
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

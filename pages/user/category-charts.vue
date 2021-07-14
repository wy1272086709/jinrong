<template>
	<view id="root-view" :style="{paddingBottom: isIphoneX ? '68rpx': ''}">
		<scroll-view :scroll-y="true" :style="{height:scrollHeight}">
			<view id="scroll-box">
			<!--
			<u-gap height="8" bgColor="rgba(255,255, 255, 0.2)" margin-bottom="25"></u-gap>
			-->
			<view v-for="item,index in categoryList" :key="item.nid" class="category-view" @tap.stop="gotoCategoryPage(item)" :style="{height: itemHeight}">
				<!-- :style="{height: itemTopHeight}" -->
				<view class="category-item-box" :style="{height: itemTopHeight}">
					<view class="between-class">
						
					</view>
					<view class="between-class flex-column-class flex-class">
						<view class="flex-class w-css flex-bj">
							<view class="flex-class">
								<view style="margin-right: 15rpx;display: flex;" class="bold-text u-font-36 my-font-color">{{item.title}}</view>
								<view class="vertical-center">
									<u-tag size="mini" :text="item.isOpen? '已开仓':'未开仓'" bgColor="transparent" :color="item.isOpen ? '#2D8CF0':'#EE4368'" :borderColor="item.isOpen ? '#2D8CF0': '#EE4368'"></u-tag>
								</view>
							</view>
							<!-- 收益率 -->
							<!--
							<view :class="item.profitRatio>0 ? 'green-color bold-text u-font-17':'red-color bold-text u-font-17'">{{(item.profitRatio>0?'+'+item.profitRatio :(item.profitRatio<0 ? '-'+item.profitRatio +'%': item.profitRatio))+'%'}}</view>
							-->
							<view style="display: flex;">
								<!--
								<image src="/static/image/user/charts.png" />
								-->
								<!--
								<icon class="iconfont icon-tubiao"></icon>
								-->
								<view :class="item.annualized_return<0?'red-class bold-text u-font-34': 'green-class bold-text u-font-34'">{{(item.annualized_return>0?('+'+item.annualized_return):item.annualized_return)+'%'}}</view>
							</view>
						</view>
						<view class="flex-class u-m-t-10 w-css flex-bj">
							<view class="my-white-color u-font-24 flex-class u-flex">
								<view my-font-color>
									<text class="text-margin u-font-24">{{item.startDate}}</text>
									<text class="u-font-24">开始</text>
								</view>
								
								<view class="u-flex">
									<text class="u-m-l-20 u-font-24">已运行</text> 
								<text class="text-margin u-m-l-10 bold-text u-font-30">{{parseInt(item.run_time.split('天')[0])+1}}</text>
								<text class="u-font-24">天</text>
								</view>
							</view>
							<view class=" u-font-24 flex-class center-flex-column">
								<view>年化收益</view>
							</view>
						</view>
						
					</view>
					<view class="between-class my-white-color">
						<view class="flex-class u-flex">
							<view class="u-font-24 u-flex">
								<text class="text-margin u-font-24">实投资金:</text> 
								<text class="bold-text u-font-30">{{item.initial_capital}}</text>
							</view>
							<view class="u-font-24 margin_left u-flex">
								<text class="text-margin u-font-24">当前资金:</text>
								<text class="bold-text u-font-30">{{item.now_capital}}</text>
							</view>
						</view>
						<view class="u-font-24">
							
						</view>
					</view>
					<view class="between-class">
						<view class="flex-class flex-1 my-white-color u-font-24 center-flex-column" v-if="item.isOpen">
							<view class="flex-class flex-1">当前持仓收益</view>
							<view :class="['bold-text','flex-1', ' u-font-30',item.profitsPositions > 0? 'green-class': 'red-class']">{{item.profitsPositions}}</view>
							<view :class="['bold-text','flex-1', ' u-font-30', item.yieldPositions>0?'green-class': 'red-class' ]">{{item.yieldPositions+'%'}}</view>
						</view>
						<view v-if="!item.isOpen" class="flex-class flex-1 row-center-class gray-color u-font-24">
							<text>当前未开仓,无持仓收益</text>
						</view>
					</view>
					<!--
					<u-line color="rgba(255, 255, 255, 0.2)"></u-line>
					
					
					<view style="height: 1px; background-color: rgba(255, 255, 255, 0.2);">
						
					</view>
					-->
					<view class="between-class">
						
					</view>
				<!-- 近一周 -->
				</view>
				<view class="flex-class u-m-t-18 u-m-b-18 flex-1">
					<view class="font-class center-flex-row flex-1">
						<!--   class="margin-css" -->
						<view  space="ensp" class="title-view flex-class">近一周收益</view> 
						<view :class="item.week_profit<0?'red-class flex-class': 'green-class flex-class'">{{item.week_profit.toFixed(2)}}</view>
						<view class="flex-class">
							<text :class="item.nearly_week<0?'red-class': 'green-class'">{{item.nearly_week.toFixed(2)}}%</text>
						</view>
					</view>
					<!--
					<u-line length="300" direction="col"  color="rgba(255, 255, 255, 0.2)" custom-style="{width:'1px'}"></u-line>
					-->
					<!-- 近一月 -->
					<view class="line-css">
						
					</view>
					<view class="font-class center-flex-row flex-1">
						<!--   class="margin-css" -->
						<view  space="ensp" class="title-view padding-css">近一月收益</view> 
						<view :class="item.month_profit<0?'red-class padding-css': 'green-class padding-css'">{{item.month_profit.toFixed(2)}}</view>
						<view>
							<text :class="item.nearly_month<0?'red-class': 'green-class'">{{item.nearly_month.toFixed(2)}}%</text>
						</view>
					</view>
					
					<!--
					<u-line length="300" direction="col"  color="rgba(255, 255, 255, 0.2)" custom-style="{width:'1px'}"></u-line>
					-->
					<!-- 近一年 -->
					<view class="line-css">
						
					</view>
					
					<view class="font-class center-flex-row flex-1">
						<view space="ensp" class="title-view padding-css">近一年收益</view>
							<view :class="item.year_profit<0?'red-class padding-css': 'green-class padding-css'">{{item.year_profit.toFixed(2)}}
						</view>
						<view>
							<text :class="item.nearly_year<0?'red-class ': 'green-class '">{{item.nearly_year.toFixed(2)}}%</text>
						</view>
					</view>
					
					<!--
					<u-line length="300" direction="col"  color="rgba(255, 255, 255, 0.2)" custom-style="{width:'1px'}"></u-line>
					-->
					<view class="line-css">
						
					</view>
					<!-- 累计的 -->
					<view class="font-class center-flex-row flex-1">
						<view space="ensp" class="title-view padding-css">总收益</view>
						<view :class="item.total_profit<0?'red-class padding-css': 'green-class padding-css'">{{item.total_profit.toFixed(2)}}
						</view>
						<view>
							<text :class="item.nearly_total<0?'red-class padding-css': 'green-class padding-css'">{{item.nearly_total.toFixed(2)}}%</text>
						</view>
					</view>
				</view>
				<!--
				<u-gap height="8" bgColor="rgba(255,255, 255, 0.2)"></u-gap>
				-->
				
				
			</view>	
			<u-loadmore :status="status" bg-color="#333" color="rgba(255,255,255,0.2)" />
		</view>
		<view style="height: 20px;"></view>
		</scroll-view>
	</view>
</template>

<script>
	import { getCgrouplist } from '@/api/category_view.js'
	import { getProfitYield } from '@/api/overall_stat.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			const chartData = {
				categories: [ 
					"2021-05-18",
					 "2021-05-19",
					 "2021-05-20",
					 "2021-05-21",
					 "2021-05-22",
					 "2021-05-23",
					 "2021-05-24",
				],
				series: [
					{
						name: '收益',
						data: [
							"-2673.1900", "1935.7900", "-361.3000", "-1140.6200", "-2886.2700", "-7602.8900", "1184.5400"
						],
					}
				]
			};
			return {
				categoryList: [
				],
				itemHeight: '',
				itemTopHeight: '',
				isIphoneX: false,
				scrollHeight: '',
				navigatorUrl: '',
				chartData: [
					
				],
				status: 'nomore',
				opts: {
					xAxis: {
						disabled: true,
						disableGrid: true,
						axisLine: false,
					},
					enableMarkLine: true,
					yAxis: {
						disabled: false,
						disableGrid: false,
						gridType: 'dash',
						dashLength: 4,
						gridColor: 'rgba(255, 255, 255, 0.2)',
						
						data: [{
						"fontColor": "#666666",
							position: "right",
							disabled: false,
							unit: '%',
							axisLine: false,
							"tofix": 2,
							format:val=>{return val+'%'}
						}]
					},
					legend: {
						show: false,
						position: "top",
						float: "center",
					},
					extra: {
						tooltip: {
							showBox: false,
							splitLine: false,
						},
						markLine: {
							type: "dash",
							dashLength: 4,
							data: [
								{
									value: '0',
									showLabel: true,
								}
							]
						}
					}
				}
			}
		},
		async onShow() {
			this.interval = setInterval(async ()=>{
				this.initPage()
			}, 1000*5);
		},
		beforeDestroy() {
			if (this.interval) {
				clearInterval(this.interval)
			}
		},
		onHide() {
			if (this.interval) {
				clearInterval(this.interval)
			}
		},
		computed: {
			...mapState(['strategistId']),
			getChartData() {
				return (index) => {
					if (this.chartData.length==0) return {
						
					}
					const data = this.chartData[index];
					console.log(data)
					return data.categories && data.categories.length>0 ? data : {}
				}
			}
		},
		async onLoad(option) {
			this.cgroup_ids = []
			uni.setNavigationBarTitle({
				title:option.title
			})
			console.log(option)
			this.groupId = option.groupId
			this.title   = option.title
			
			this.navigatorUrl = '/pages/user/category_view'
			const info = uni.getSystemInfoSync()
			const isIphoneX = getApp().globalData.isIphoneX
			this.isIphoneX = isIphoneX
			const iphoneXPadding = isIphoneX ? uni.upx2px(68): 0;
			this.scrollHeight = info.windowHeight - iphoneXPadding+'px'
			this.itemHeight = (info.windowHeight - iphoneXPadding - uni.upx2px(50))/3+'px'
			this.itemTopHeight = (info.windowHeight - iphoneXPadding - uni.upx2px(50))/3 - uni.upx2px(176)+'px'
			this.initPage()
		},
		methods: {
			async initPage() {
				const promise1 = getCgrouplist(this.groupId, this.strategistId).catch(err => {
					return JSON.stringify(err)
				});
				try {
					const data = await   promise1
					this.combineData(data)
				} catch(e) {
					
				}
			},
			combineData(list) {
				const n = list.length;
				const rows = []
				const cgroup_ids = [] 
				for (let m = 0;m<n;m++) {
					const row = {
						title: list[m].cname,
						initial_capital: list[m].initial_capital,
						now_capital: list[m].now_capital,
						startDate: list[m].start_time.substr(0, 10),
						nid: list[m].id,
						annualized_return: list[m].annualized_return,
						isOpen: list[m].positions> 0? 1: 0,
						month_profit: list[m].profits.month !== undefined ? list[m].profits.month:'',
						nearly_month: list[m].yield.month!== undefined ? list[m].yield.month: '',
						year_profit: list[m].profits.year !== undefined ? list[m].profits.year: '',
						nearly_year: list[m].yield.year !== undefined ? list[m].yield.year: '',
						week_profit: list[m].profits.week !== undefined ? list[m].profits.week:'',
						nearly_week: list[m].yield.week!== undefined ? list[m].yield.week: '',
						total_profit: list[m].profits.total !== undefined ? list[m].profits.total:'',
						nearly_total: list[m].yield.total!== undefined ? list[m].yield.total: '',
						run_time: list[m].run_time,
						yieldPositions: list[m].yield.positions,
						profitsPositions: list[m].profits.positions
						//isOpen: true,
					}
					rows.push(row)
				}
				if (rows.length> 0) {
					this.categoryList = rows;
				}
				if (cgroup_ids.length>0) {
					this.cgroup_ids = cgroup_ids
				}
			},
			// 时间字符串,类似于 2021-05-26 00:00:00这种
			getTimeDiff(s) {
				const startT = Date.parse(s)
				const endT   = (new Date).getTime()
				const diff   = endT - startT
				const days   = Math.floor(diff/(24*3600*1000))
				 return days+"天"
			},
			gotoCategoryPage(item) {
				console.log(item)
				console.log(this.navigatorUrl)
				uni.navigateTo({
					url: this.navigatorUrl+'?title='+item.title+'&cgroup_id='+item.nid
				})
			},
			complete(e) {
				console.log(e)
				
				const nidStr = e.id.substr(7)
				const index  = this.categoryList.findIndex((item)=>{
					return item.nid == nidStr
				})
				if (index !== -1)
				this.categoryList[index].showText = true
			},
			drawText(canvasId) {
				const ctx = uni.createCanvasContext(canvasId)
				const text = "累计收益: 3000.00"
				ctx.strokeStyle="#FFFFFF"
				ctx.font = "25px bold"
				ctx.strokeText(text, 100, 100)
				ctx.stroke()
			},
			getIndex(e) {
				
			}
		}
	}
</script>

<style lang="scss">
/*@import url("/static/css/iconfont.css");*/
#root-view {
	background-color: $kp-bg-color;
	height: 100vh;
	color: rgba($color: #ffffff, $alpha: 0.5);
}
.flex-class {
	display: flex;
}
.m-t-10 {
	margin-top: -10rpx;
}
.flex-column-class {
	flex-direction: column;
}
scroll-view ::-webkit-scrollbar {
	display: none;
	width: 0;
	height: 0;
	background-color: transparent;
}

.flex-1 {
	flex: 1;
}
.margin_left{
	margin-left: 100rpx;
}
#scroll-box {
	display: flex;
	flex-direction: column;
	align-items: space-between;
}
.charts {
	height: 300rpx ;
	width: 690rpx;
	position: relative;
}
.white-color {
	color: $kp-font-color;
}
.green-color {
	color: $kp-green-color;
}

.red-color {
	color: $kp-red-color;
}

.green-class {
	color: $kp-green-color;
}
	
.red-class {
	color: $kp-red-color;
}
.vertical-center {
	@extend .flex-class;
	align-items: center;
}
.category-view {
	// margin-bottom: 25rpx;
	// padding-top:15rpx;
	// margin-left: 30rpx;
	// margin-right: 30rpx;
	margin: 15rpx 20rpx;
	display: flex;
	flex-direction: column;
	border-radius: 8rpx;
	background-color: rgba($color: #FFFFFF, $alpha: 0.1);
}

.between-class {
	@extend .flex-class;
	@extend .white-color;
	@extend .margin-css;
	@extend .flex-bj;
	/*margin-bottom: 20rpx;*/
}
.flex-bj {
	justify-content: space-between;
	align-items: center;
}
.w-css {
	width: 650rpx;
}
.margin-css {
	margin-left: 30rpx;
	margin-right: 30rpx;
}
.my-white-color {
	font-family: SimHei;
	color: rgba($color: #FFFFFF, $alpha: 0.8);
}
.my-font-color{
	color: rgba($color: #ffffff, $alpha: 0.5);
}
.gray-color {
	color: #999999;
}
.text-margin {
	margin-right: 10rpx;
}

.category-view-box {
	display: flex;
	
}

.canvas-css {
	position: absolute;
	top: 30px;
	right:50px;
	background-color: $kp-bg-color;
	opacity: 0.7;
	color: #FFFFFF;
	z-index: 99999999;
}
.chartsview {
	position: absolute;
	z-index: 1;
}
.bold-text {
	font-weight: 800;
}
.navigator-css {
	display: flex;
	flex: 1;
	color: #169BD5;
	justify-content: center;
}
.category-item-box {
	display: flex;
	flex-direction: column;
	/*padding-bottom: 15rpx;
	padding-top: 15rpx;*/
	justify-content: space-between;
	border-bottom: 1px solid rgba($color: #FFFFFF, $alpha: 0.2);
}

	.flex-row-class {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 40rpx;
		margin-right: 40rpx;
		height: 80rpx;
	}

	.font-class {
		color: rgba($color: #ffffff, $alpha: 0.5);
		font-size: 24rpx;
	}

	.center-flex-row {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		/*margin-top: 20rpx;
		margin-bottom: 20rpx;*/
	}
	
	.center-flex-column {
		align-items: center;
	}
	
	.row-center-class {
		text-align: center;
		justify-content: center;
	}
	.column-center-class {
		
	}
	.bottom-flex {
		display: flex;
		@extend  .center-flex-column;
	}
	.padding-css {
		padding-bottom: 20rpx;
	}
	.title-view {
		
	}
	.line-css {
		width: 1px;
		/*margin-top: 20rpx;
		margin-bottom: 20rpx;*/
		background-color: rgba(255, 255, 255, 0.2);
	}
</style>

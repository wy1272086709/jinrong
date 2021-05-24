<template>
	<scroll-view :scroll-y="true" :style="{height: scrollHeight}" @scrolltolower="$emit('lower')">
		<view class="wrap-box-view">
			<view class="history-table-view">
	<!-- 1:平多(红色),2:做多(绿色),3:平空(绿色),4:做空(红色) -->
				<view class="history-content">
					<view v-for="info in history_data" class="history-content-row" :key="info.id">
						<view class="history-content-row-1">
							<view class="left-view">
								<!--
								<text class="bold-text">{{currencyPairs}}</text>
								-->
								<view :class="[(info.statusTxt == '卖出平多' || info.statusTxt == '卖出开空') ? 'red-color':'blue-color']">
									<text>{{info.statusTxt}}</text>
								</view>
								
							</view>
							<view class="right-view">
								<text class="right-view-time">{{info.year+"/"+info.date+" "+info.minute}}</text>
							</view>
						</view>
						<!--
						<view class="history-content-row-1 margin-css">
							
						</view>
						-->
						<view class="history-content-row-2">
							<view class="left-view">
								<view class="label-text quality-label-color" space="nbsp">价格</view>
								<text class="quality-label-color">/数量:</text>
								<text class="label-text price-color u-m-l-10">{{info.avg_price}}</text>
								<text class="u-m-l-10 u-m-r-10 quality-label-color">/</text>
								<view class="label-text price-color">{{info.sum_volume}}</view>
								
							</view>
							<view class="flex-1">
								<text class="label-text quality-label-color" space="nbsp">成交金额:</text>
								<text class="label-text price-color u-m-l-10">{{info.turnover}}</text>
							</view>
							
						</view>
						<u-line margin="0px 0px" color="rgba('#FFFFFF', 0.3)">
							
						</u-line>
						<view class="history-content-row-3">
							
								<view class="left-view">
									
									<view class="income-color   label-text right-view-label flex-1">收益:   </view>
									<view v-if="info.benifits>0" class="blue-color flex-1 font-30">{{info.benifits}}</view>
									<view v-if="info.benifits==0" class="font-color1 flex-1 font-30">{{info.benifits}}</view>
									<view v-if="info.benifits<0" class="red-color flex-1 font-30">{{info.benifits}}</view>
								</view>
								
								<view v-if="info.margins>0" class="blue-color flex-1 font-30]">{{info.margins+'%'}}</view>
								<view v-if="info.margins==0" class="font-color1 flex-1 font-30]">{{info.margins+'%'}}</view>
								<view v-if="info.margins<0" class="red-color flex-1 font-30]">{{info.margins+'%'}}</view>
								<view class="flex-1" style="margin-right: 30rpx;">
								
								<image v-if="info.benifits<0" 
								src="@/static/image/overall_view/next.png" style="width: 30rpx;height: 30rpx;"></image>
								
								<image v-if="info.benifits>0" 
								src="@/static/image/overall_view/prev.png" style="width: 30rpx;height: 30rpx;"></image>
								</view>
							</view>
						</view>
					</view>
					<u-loadmore status="nomore" v-if="isShowDx" bg-color="#333333"></u-loadmore>
				</view>
			</view>
		</view>	
		
	</scroll-view>
	
</template>

<script>
	export default {
		data() {
			return {
				sDateText: '开始日期',
				eDateText: '结束日期',
				winRatio: 0,
				index: 0,
				title1: '所有操作',
				value1: 0,
				rangeVisible: false,
				startYear: '',
				endYear: '',
				rangeVal: '',
				scrollHeight: '',
				isIphoneX: false,
			}
		},
		props: {
			dataList: {
				type: Array,
				default() {
					return []
				}
			},
			sName: {
				type: String,
				default: ''
			},
			isShowDxFlag: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			history_data: function() {
				console.log('computed:')
				console.log(this.dataList)
				return this.dataList
			},
			isShowDx: function() {
				return this.isShowDxFlag
			}
		},
		beforeDestroy() {
			console.log('component destory...')
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.isIphoneX = getApp().globalData.isIphoneX
			console.log('info1'+JSON.stringify(info))
			const iphoneXPadding = this.isIphoneX?uni.upx2px(68):0
			console.log('padding1:'+iphoneXPadding)
			this.scrollHeight = info.windowHeight - uni.upx2px(80) - 40 - uni.upx2px(23) - iphoneXPadding - uni.upx2px(3)- 3+'px';
			//this.initHistoryLogList(this.sName)
		},
		methods: {
			clickSwithTab(index) {
				
			},
			
			fixedChange() {
				
			},
			unfixedChange() {
				
			},
			lower() {
				
			}
		},
	}
</script>

<style lang="scss">
::-webkit-scrollbar {
	width: 0;
	height: 0;
	display: none;
	color:transparent;
}
		
.green-css {
	color:rgba(38,214,80,1);
}

.red-css {
	color:rgba(254,65,87,1);
}


.history-content {
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

.flex-1 {
	display: flex;
	flex: 1;
}
.history-content-row {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 32rpx;
	padding-top: 32rpx;
	/*border-bottom: 1px solid #F2F2F2;*/
	padding-left: 32rpx;
	padding-right: 32rpx;
	&-1 {
		display: flex;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-radius: 5px;
		color: #FFFFFF;
		height: 74rpx;
		align-items: center;
		justify-content: space-between;
	}
	&-2 {
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		justify-content: space-between;
	}
	&-3 {
		display: flex;
		padding-top: 20rpx;
		justify-content: space-between;
		>view:nth-child(3) {
			display: flex;
			justify-content: flex-end;
		}
	}
	&-4 {
		display: flex;
	}
}

.quality-label-color {
	color: rgba($color: #C3C3C3, $alpha: 0.96);
	opacity: 0.96;
}
.price-label-color {
	color: rgba($color: #FFFFFF, $alpha: 0.96);
	margin-right: 20rpx;
}
.price-color {
	color: #FFFFFF;
}
.income-color {
	color: rgba(#A9A9A9, 0.96);
	
}
.offset-left {
	padding-left: 20rpx;
}

.quality-color {
	font-weight: 400;
	color: #B7B7B7;
}
.light-font {
	color: #282828;
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

.bold-text {
	font-size: 32rpx;
	font-weight: 800;
}

.left-view {
	width: 60%;
	font-size: 28rpx;
	font-family: SimHei;
	font-weight: 400;
	color: #FFFFFF;
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
	/*width: 40%;*/
	display: flex;
	color: #282828;
	&-time {
		font-size: 22rpx;
		font-family: SimHei;
		font-weight: 400;
		color: rgba($color: #FFFFFF, $alpha: 0.5);
	}
}
.green-color {
	color: #00C087;
	font-weight: 500;
	font-family: SimHei;
	font-size: 28rpx;
}

.blue-color {
	color: $kp-blue-color;
	font-weight: 500;
	font-family: SimHei;
	font-size: 28rpx;
}

.red-color {
	color: #ED3F5D;
	font-weight: 500;
	font-family: SimHei;
	font-size: 28rpx;
}
.label-text {
	font-size: 28rpx;
	font-family: SimHei;
	font-weight: 400;
}
.font-color1{
	color: rgba(169,169,169,0.96);
}
.font-30 {
	font-size: 30rpx;
	font-family: SimHei;
	font-weight: 400;
}
.green-bgc {
	background-color: #00C087;
	padding-left:5rpx;
	padding-right:5rpx;
	color: #FFFFFF;
}
.red-bgc {
	background-color: #ED3F5D;
	padding-left:5rpx;
	padding-right:5rpx;
	/*color: #FFFFFF;*/
}
.red-color {
	color: #ED3F5D;
	font-weight: 500;
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
